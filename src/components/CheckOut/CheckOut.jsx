import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "./CheckOut.scss";

const CheckOut = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "Cash on delivery",
    couponCode: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "streetAddress",
      "city",
      "phoneNumber",
      "email",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field.replace(/([A-Z])/g, " $1").trim()} is required.`);
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      toast.success("Order placed successfully!");
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      console.log(orders);
    }
  };

  return (
    <div className="checkout-container">
      {/* Billing Details Section */}
      <div className="billing-details">
        <h2>Billing Details</h2>
        <form>
          <div className="form-group">
            <label>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Street Address*</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Apartment, floor, etc. (optional)</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Town/City*</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number*</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
            />
            <label>Save this information for faster check-out next time</label>
          </div>
        </form>
      </div>

      {/* Order Summary Section */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="cart-items">
          <div className="cart-item">
            <img src="/path-to-lcd-monitor.jpg" alt="LCD Monitor" />
            <span>LCD Monitor</span>
            <span>$650</span>
          </div>
          <div className="cart-item">
            <img src="/path-to-gamepad.jpg" alt="HI Gamepad" />
            <span>HI Gamepad</span>
            <span>$1100</span>
          </div>
        </div>
        <div className="order-totals">
          <div className="totals-row">
            <span>Subtotal:</span>
            <span>$1750</span>
          </div>
          <div className="totals-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="totals-row">
            <span>Total:</span>
            <span>$1750</span>
          </div>
        </div>
        <div className="payment-methods">
          <h3>Payment Methods</h3>
          <div className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="Bank"
              checked={formData.paymentMethod === "Bank"}
              onChange={handleChange}
            />
            <label>Bank</label>
          </div>
          <div className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on delivery"
              checked={formData.paymentMethod === "Cash on delivery"}
              onChange={handleChange}
            />
            <label>Cash on delivery</label>
          </div>
        </div>
        <div className="coupon-code">
          <input
            type="text"
            name="couponCode"
            value={formData.couponCode}
            onChange={handleChange}
            placeholder="Coupon Code"
          />
          <button className="apply-coupon">Apply Coupon</button>
        </div>
        <button className="place-order" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
