import React, { useContext } from "react";
import { Context } from "../../Utils/Context"; // Ensure the correct path
import Products from "../Products/Products";
import { useNavigate } from "react-router-dom";
import "./Favorites.scss";

const Favorites = () => {
  const navigate = useNavigate();
  const { favoriteItems } = useContext(Context);

  return (
    <div className="main-content">
      <div className="layout">
        <div className="favorites-page">
          {/* Check if there are any favorite items */}
          {favoriteItems.length === 0 ? (
            <div className="empty-favorites">
              <p>No favorite products added yet.</p>
              <button
                className="browse-products-btn"
                onClick={() => navigate("/shop")}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <Products
              products={{ data: favoriteItems }}
              headingText="Favorite Products"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
