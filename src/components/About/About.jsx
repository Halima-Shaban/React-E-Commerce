import React from "react";
import "./About.scss";
import face1 from "../../assets/face1.webp";
import face2 from "../../assets/face2.jpeg";
import face3 from "../../assets/face3.webp";

const About = () => {
  return (
    <div className="about-container">
      {/* About Us Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Welcome to Exclusive, your number one source for all things fashion,
          electronics, and lifestyle. We're dedicated to giving you the very
          best of products, with a focus on quality, customer service, and
          uniqueness.
        </p>
        <p>
          Founded in 2020 by Md Rimel, Exclusive has come a long way from its
          beginnings as a small online store. When Rimel first started, his
          passion for providing customers with high-quality yet affordable
          products drove him to do tons of research so that Exclusive can offer
          you the world’s best products at unbeatable prices.
        </p>
        <p>
          We hope you enjoy our products as much as we enjoy offering them to
          you.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to bring the best products to our customers at
          affordable prices, while ensuring a seamless online shopping
          experience. We believe in customer satisfaction and quality service.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="choose-us-section">
        <h2>Why Choose Us</h2>
        <ul>
          <li>High-Quality Products</li>
          <li>Free and Fast Shipping</li>
          <li>24/7 Customer Support</li>
          <li>Secure Payment Methods</li>
          <li>Exclusive Deals and Discounts</li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={face1} alt="Md Rimel" />
            <h3>Md Rimel</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src={face2} alt="Jane Doe" />
            <h3>Jane Doe</h3>
            <p>Marketing Director</p>
          </div>
          <div className="team-member">
            <img src={face3} alt="John Smith" />
            <h3>John Smith</h3>
            <p>Head of Operations</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
