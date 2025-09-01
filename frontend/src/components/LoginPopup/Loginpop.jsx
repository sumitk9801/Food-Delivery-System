import React from "react";
import "./LoginPopup.css";
import { useState } from "react";
import { assets } from "../../assets/assets.js";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";


const LoginPop = ({ setShowLogin }) => {

  const {url,setToken}=useContext(StoreContext);

  const [currentState, setCurrentState] = useState("login");
  const [data,setData]= useState({
    name:"",
    email:"",
    password:""
  })
  
  const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value
    setData(data=>({...data,[name]:value}));
  }

  const onLogin = async(event)=>{
    event.preventDefault();
    let newUrl = url;
    if(currentState === "login"){
      newUrl +="/api/user/login";
    }
    else{
      newurl +="/api/user/register";
    }

    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
    }
    else{
      alert(response.data.message);
    }

  }

  return (
    <div className="login-popup">
      <form onSubmit = {onLogin} className="login-popup-container">
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
              <input name="name" onChange={onChangeHandler} value ={data.name} type="text" placeholder="Your name" required />
            )}
            <input name="email" onChange={onChangeHandler} value ={data.email}type="email" placeholder="Your Email" required />
            <input name="password" onChange={onChangeHandler} value ={data.password} type="password" placeholder="Your password" required />
          </div>
        </div>
        <button type="submit">
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
