import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../Utils/Context";
import CartItem from "./CartItem/CartItem";
import CustomButton from "../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

import "./Cart.scss";
import Paypal from "../paypalComponrnt";

const Cart = () => {
  const {
    cartItems,
    setShowCart,
    cartSubTotal,
    handleClearCart,
    setCartItems,
  } = useContext(Context);
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <CustomButton
              className="return-cta"
              onClick={() => {
                navigate("/shop");
                setShowCart(false);
              }}
              label="RETURN TO SHOP" // Use label prop
            />
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">${cartSubTotal}</span>
              </div>
              <div className="button-group">
                <CustomButton
                  className="clear-cart-cta"
                  onClick={() => setCartItems([])}
                  label="Clear All" // Use label prop
                />
                {checkout ? (
                  <Paypal />
                ) : (
                  <CustomButton
                    className="checkout-cta"
                    onClick={() => {
                      setCheckout(true);
                    }}
                    label="Checkout" // Use label prop
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
