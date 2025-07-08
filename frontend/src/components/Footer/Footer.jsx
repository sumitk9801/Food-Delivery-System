import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" className="logo" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat quas a autem in. </p>

          <div className="footer-social-icons">
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              className="social-icon"
            />
            <img
              src={assets.linkedin_icon}
              alt="Instagram"
              className="social-icon"
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter"
              className="social-icon"
            />
          </div>
        </div>
        <div className="footer-content-right">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h2>Get in Touch</h2>
          <ul>
            <li>+91-XXXXXXXXX</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyrite">
        © 2023 Food Delivery. All rights reserved.
        Made with ❤️ by tomato
      </p>
    </div>
  );
};

export default Footer;
