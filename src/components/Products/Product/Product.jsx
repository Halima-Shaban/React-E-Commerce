import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../Utils/Context";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import CustomButton from "../../CustomButton/CustomButton";
import { toast } from "react-hot-toast";
import "./Product.scss";

const Product = ({ data = {}, id = 0 }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // Default quantity to 1

  const {
    favoriteItems,
    handleAddToFavorites,
    handleRemoveFromFavorites,
    productRatings,
    handleRateProduct,
    handleAddToCart,
  } = useContext(Context);

  const [userRating, setUserRating] = useState(productRatings?.[id] || 0); // Safe access to productRatings
  const [isFavorited, setIsFavorited] = useState(false);

  // Check if this product is already in the favorites
  useEffect(() => {
    setIsFavorited(favoriteItems?.some((item) => item.id === Number(id)));
  }, [favoriteItems, id]);

  const handleRatingClick = (rating) => {
    setUserRating(rating);
    handleRateProduct?.(id, rating); // Optional chaining in case handleRateProduct is undefined
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      const starIndex = index + 1;
      return (
        <span
          key={starIndex}
          className={starIndex <= rating ? "filled-star" : "empty-star"}
          onClick={() => handleRatingClick(starIndex)}
          style={{ cursor: "pointer" }}
        >
          ★
        </span>
      );
    });
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    const product = { id, attributes: data };

    if (isFavorited) {
      handleRemoveFromFavorites?.(product);
      toast.success(`${data?.title || "Product"} removed from favorites!`);
    } else {
      handleAddToFavorites?.(product);
      toast.success(`${data?.title || "Product"} added to favorites!`);
    }

    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="product-card">
      <div className="thumbnail" onClick={() => navigate(`/product/${id}`)}>
        <img
          src={
            data?.img?.data?.length > 0 && data.img.data[0]?.attributes?.url
              ? `${
                  process.env.REACT_APP_STRIPE_APP_DEV_URL +
                  data.img.data[0].attributes.url
                }`
              : "path/to/fallback-image.jpg" // Fallback image if URL is missing
          }
          alt={data?.title || "Product Image"} // Fallback alt text
        />
      </div>
      <div className="prod-details">
        <span className="name">{data?.title || "Unknown Product"}</span>
        <span className="price" style={{ color: "rgb(131, 131, 54)" }}>
          <small style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
            $
          </small>
          {data?.price || "N/A"} {/* Fallback price */}
        </span>

        <div className="rating">{renderStars(userRating)}</div>

        {/* Add/Remove from Favorites Button */}
        <div className="button-group">
          <CustomButton
            className="icon-button"
            onClick={handleFavoriteToggle}
            ariaLabel={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
            icon={isFavorited ? FaHeart : FaRegHeart}
          />

          <CustomButton
            className="icon-button"
            onClick={() => {
              handleAddToCart?.({ id, attributes: data }, quantity); // Safely call handleAddToCart
              toast.success("Added to cart!");
              setQuantity(1); // Reset quantity to 1 after adding to cart
            }}
            icon={FaCartPlus}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
