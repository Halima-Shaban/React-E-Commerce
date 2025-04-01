import React, { useEffect, createContext, useState } from "react";
import { useLocation } from "react-router-dom";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteItems");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [productRatings, setProductRatings] = useState(() => {
    const savedRatings = localStorage.getItem("productRatings");
    return savedRatings ? JSON.parse(savedRatings) : {};
  });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    let count = 0;
    cartItems.forEach((item) => (count += item.attributes.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.forEach(
      (item) => (subTotal += item.attributes.price * item.attributes.quantity)
    );
    setCartSubTotal(subTotal);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    const index = items.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      // Ensure that attributes and quantity are properly defined before updating
      if (!items[index].attributes) {
        items[index].attributes = {}; // Initialize attributes if missing
      }
      if (typeof items[index].attributes.quantity !== "number") {
        items[index].attributes.quantity = 0; // Initialize quantity if not set
      }
      items[index].attributes.quantity += quantity;
    } else {
      // Ensure product.attributes exists and quantity is set
      if (!product.attributes) {
        product.attributes = {};
      }
      product.attributes.quantity = quantity;
      items.push(product);
    }

    setCartItems(items);
  };

  const handleRemoveFromCart = (product) => {
    const items = cartItems.filter((p) => p.id !== product.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    const items = [...cartItems];
    const index = items.findIndex((p) => p.id === product.id);
    if (type === "inc") {
      items[index].attributes.quantity += 1;
    } else if (type === "dec") {
      if (items[index].attributes.quantity > 1) {
        items[index].attributes.quantity -= 1;
      }
    }
    setCartItems(items);
  };

  // Save favorite items to localStorage
  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  // Save product ratings to localStorage
  useEffect(() => {
    localStorage.setItem("productRatings", JSON.stringify(productRatings));
  }, [productRatings]);

  // Add or update product rating
  const handleRateProduct = (productId, rating) => {
    const updatedRatings = { ...productRatings, [productId]: rating };
    setProductRatings(updatedRatings);
  };

  // Add item to favorites
  const handleAddToFavorites = (product) => {
    console.log(product);
    console.log("first");
    if (product) {
      console.log("sss");
      const items = [...favoriteItems];
      const index = items.findIndex((p) => p.id === product.id);
      console.log(items);
      if (index === -1) {
        items.push(product);
        setFavoriteItems(items);
      }
    } else {
      console.error("Invalid product data:", product);
    }
  };

  // Remove item from favorites
  const handleRemoveFromFavorites = (product) => {
    const items = favoriteItems.filter((p) => p.id !== product.id);
    setFavoriteItems(items);
  };

  // Handle user registration with Strapi
  const handleRegister = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: "Registration successful!" };
      } else {
        return {
          success: false,
          message: data.error ? data.error.message : "An error occurred.",
        };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return {
        success: false,
        message: "An error occurred during registration.",
      };
    }
  };

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        cartItems,
        setCartItems,
        handleAddToCart,
        cartCount,
        handleRemoveFromCart,
        showCart,
        setShowCart,
        handleCartProductQuantity,
        cartSubTotal,
        favoriteItems,
        setFavoriteItems,
        handleAddToFavorites,
        handleRemoveFromFavorites,
        handleRateProduct,
        productRatings,
        handleRegister,
        token,
        setToken,
        userData,
        setUserData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
