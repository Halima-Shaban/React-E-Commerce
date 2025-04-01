import React, { useEffect, useContext } from "react";
import Category from "../Home/Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../Utils/api";
import { Context } from "../../Utils/Context";

const Shop = () => {
  const { products, setProducts, categories, setCategories } =
    useContext(Context);
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = () => {
    fetchDataFromApi("/api/products?populate=*").then((res) => {
      console.log(res);

      setProducts(res);
    });
  };
  const getCategories = () => {
    fetchDataFromApi("/api/categories?populate=*").then((res) => {
      console.log(res);
      setCategories(res);
    });
  };

  return (
    <div>
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products headingText="ALL Products" products={products} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
