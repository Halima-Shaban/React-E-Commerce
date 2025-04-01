import React, { useState, useContext, useEffect, useRef } from "react";
import loginImage from "../../assets/dl.beatsnoop 1.png";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../Utils/Context"; // Import your context

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const emailInput = useRef();
  const passInput = useRef();
  const navToShop = useNavigate();

  // const [emailInput, setEmailInput] = useState("");
  // const [passInput, setPassInput] = useState("");

  // setToken,
  //       userData,
  //       setUserData,

  const { handleLogin, setUserData, setToken } = useContext(Context); // Access the login function from context
  const navigate = useNavigate();
  const [invalidAccount, setInvalidAccount] = useState(false);

  // Check if token exists in local storage on component mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/shop"); // Redirect to the shop page if a token exists
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const userLogin = (e) => {
    e.preventDefault();
    const emailInputValue = emailInput.current.value;
    const passInputValue = passInput.current.value;
    const obj = {
      identifier: emailInputValue,
      password: passInputValue,
    };

    axios
      .post("http://localhost:1337/api/auth/local", obj)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.jwt));
        setToken(res.data.jwt);
        setUserData(res.data);
        navToShop("/shop");
      })
      .catch((err) => {
        setInvalidAccount(true);
      });
  };

  //  { const loginUser = async () => {
  //    const url = `http://localhost:1337/api/auth/local`;
  //     try {
  //       if (formData.emailOrPhone && formData.password) {
  //         const { data } = await axios.post(url, {
  //           identifier: formData.emailOrPhone,
  //           password: formData.password,
  //         });

  //         if (data.jwt) {
  //           // Save the token to localStorage
  //           localStorage.setItem("jwtToken", data.jwt);

  //           // Pass the user data to the context
  //           handleLogin({
  //             token: data.jwt,
  //             user: data.user,
  //           });

  //           toast.success("Logged in successfully!", { hideProgressBar: true });
  //           navigate("/shop"); // Redirect to shop page
  //         }
  //       } else {
  //         toast.error("Please enter both email/phone and password.", {
  //           hideProgressBar: true,
  //         });
  //       }
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || error.message, {
  //         hideProgressBar: true,
  //       });
  //     }
  //};}

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginImage} alt="Shopping illustration" />
      </div>
      <div className="login-form">
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>
        <form onSubmit={userLogin}>
          <input
            type="text"
            name="emailOrPhone"
            ref={emailInput}
            placeholder="Email or Phone Number"
            value={formData.emailOrPhone}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={passInput}
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="login-btn"
            // onClick={navigate("/shop")}
          >
            Log In
          </button>
          <div className="sign-up">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
