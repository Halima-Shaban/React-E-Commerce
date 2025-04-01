import React from "react";
import { useNavigate } from "react-router-dom";

import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.png";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>SALES</h1>
          <p>
            Convallis interdum purus adipiscing dis parturient posuere ac a quam
            a eleifend montes parturient posuere curae tempor
          </p>
          <div className="ctas">
            <div className="banner-cta" onClick={() => navigate("/about")}>
              Read More
            </div>
            <div className="banner-cta v2" onClick={() => navigate("/shop")}>
              Shop Now
            </div>
          </div>
        </div>
        <img className="banner-img" src={BannerImg} alt="Promotional Banner" />
      </div>
    </div>
  );
};

export default Banner;
