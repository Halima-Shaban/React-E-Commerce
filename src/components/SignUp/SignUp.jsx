import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Utils/Context"; // Import Context
import "./SignUp.scss";
import SignUpImage from "../../assets/dl.beatsnoop 1.png";
import axios from "axios";

const SignUp = () => {
  const { handleRegister } = useContext(Context); // Access the registration function from Context
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // To store success messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      return "All fields are required.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email address is invalid.";
    }
    return null; // No errors
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    // Call the handleRegister function from context to register the user
    const response = await handleRegister(formData);
    if (response.success) {
      setSuccess(response.message);
      setError(null);
      setFormData({ username: "", email: "", password: "" }); // Clear input fields
    } else {
      setError(response.message);
      setSuccess(null);
    }
  };

  const uNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const navigateToLogin = useNavigate();

  const sendRegisterData = (e) => {
    e.preventDefault();
    const newUserData = {
      username: uNameRef.current.value,
      // lastName: lNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      // username: usernameRef.current.value,
    };
    axios
      .post("http://localhost:1337/api/auth/local/register", newUserData)
      .then((res) => {
        navigateToLogin("/login");
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
      });
  };

  return (
    <div className="signup-container">
      {/* Left Image Section */}
      <div className="signup-image">
        <img src={SignUpImage} alt="Shopping" />
      </div>

      {/* Right Form Section */}
      <div className="signup-form">
        <h2>Create an account</h2>
        <p>Enter your details below</p>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={sendRegisterData}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            ref={uNameRef}
            id="username" // Added id for accessibility
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            id="email" // Added id for accessibility
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password" // Added id for accessibility
            placeholder="Password"
            ref={passwordRef}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {/* Button to submit the form */}
          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>
        <div className="already-have-account">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
