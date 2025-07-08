import React from "react";
import "./LoginPopup.css";
import { useState } from "react";
import { assets } from "../../assets/assets.js";

const LoginPop = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("login");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div>
          <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-popup-inputs">
            {currentState === "login" ? null : (
              <input type="text" placeholder="Your name" required />
            )}
            <input type="email" placeholder="Your Email" required />
            <input type="password" placeholder="Your password" required />
          </div>
        </div>
        <button>
          {currentState === "signup" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy. </p>
        </div>
        {currentState === "login" ? <p>Create a new Account?<span onClick={()=>setCurrentState("signup")}>Click here</span></p>:<p>Already have an Account?<span onClick={()=>setCurrentState("login")}>Login here</span></p>}
        
        
      </form>
    </div>
  );
};

export default LoginPop;
