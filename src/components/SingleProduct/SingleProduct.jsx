import { useContext, useState, useEffect } from "react";
import { Context } from "../../Utils/Context";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CustomButton from "../CustomButton/CustomButton";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaRegHeart,
  FaCartPlus,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaHeart,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import "./SingleProduct.scss";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const {
    handleAddToCart,
    handleAddToFavorites,
    handleRemoveFromFavorites,
    favoriteItems,
  } = useContext(Context);

  const { data, isLoading, error } = useFetch(
    `/api/products?populate=*&[filters][id]=${id}`
  );

  const decrement = () => {
    setQuantity((prevState) => Math.max(prevState - 1, 1));
  };

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const productInFavorites = favoriteItems.find(
      (item) => item.id === Number(id)
    );
    console.log(productInFavorites);
    setIsFavorited(!productInFavorites);
  }, [favoriteItems, id]);

  // Return early if loading or there's an error
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product.</div>;

  const product = data?.data?.[0]?.attributes;

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img
              src={`${process.env.REACT_APP_STRIPE_APP_DEV_URL}${
                product?.img && product?.img?.data[0].attributes.url
              }`}
              alt={product?.title}
            />
          </div>
          <div className="right">
            <span className="name">{product?.title}</span>
            <span className="price">${product?.price}</span>
            <span className="desc">{product?.description}</span>

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
              </div>

              <div className="button-group">
                <CustomButton
                  label={isFavorited ? "Remove from Fav" : "Add to Fav"}
                  onClick={() => {
                    if (isFavorited) {
                      handleRemoveFromFavorites(product);
                      toast.success("Removed from favorites!");
                    } else {
                      handleAddToFavorites(product);
                      toast.success("Added to favorites!");
                    }
                    setIsFavorited(!isFavorited);
                  }}
                  icon={isFavorited ? FaHeart : FaRegHeart}
                />
                <CustomButton
                  label="ADD TO CART"
                  onClick={() => {
                    handleAddToCart(data?.data?.[0], quantity);
                    setQuantity(1);
                    toast.success("Added to cart!");
                  }}
                  icon={FaCartPlus}
                />
              </div>

              <Toaster position="top-center" reverseOrder={false} />
            </div>

            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:{" "}
                <span>{product?.categories?.data[0].attributes.title}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProducts
          productId={id}
          categoryId={product?.categories?.data[0].id}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
