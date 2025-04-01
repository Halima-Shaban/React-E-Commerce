import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyAccount.scss";

const MyAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel111@gmail.com",
    address: "Kingston, 5236, United States",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    // Simulating a logout action
    alert("You have been logged out!");
  };

  return (
    <div className="profile-page">
      {/* Sidebar Section */}
      <div className="sidebar">
        <h3>Manage My Account</h3>
        <ul>
          <li className="active">My Profile</li>
          <li className="my-fav" onClick={() => navigate("/Favorites")}>
            My fav
          </li>
        </ul>
      </div>

      {/* Profile Form Section */}
      <div className="profile-form">
        <div className="profile-header">
          <h2>Edit Your Profile</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <form>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <h3>Password Changes</h3>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
