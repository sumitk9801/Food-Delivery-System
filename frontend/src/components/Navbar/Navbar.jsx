import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const {getTotalCartAmount, token, setToken, setSearchTerm} = useContext(StoreContext);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <>
      <div className="navbar">
        <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <Link
            to="/#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </Link>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact us
          </a>
        </ul>
        <div className="navbar-right">
          {showSearchInput && <input type="text" placeholder="Search food..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { setSearchTerm(inputValue); setShowSearchInput(false); setInputValue(""); } }} onBlur={() => { setShowSearchInput(false); setInputValue(""); }} className="search-input" />}
          <img src={assets.search_icon} alt="search" onClick={() => setShowSearchInput(true)} className="" />
          <div className="navbar-search-icon">
            <Link to="/cart"><img src={assets.basket_icon} alt="basket" className="" /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
          </div>
          {token ? (
            <div className="profile-container">
              <img src={assets.profile_icon} alt="profile" className="profile-icon" />
              <div className="dropdown">
                <Link to="/orders" className="dropdown-item">Orders</Link>
                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
              </div>
            </div>
          ) : (
            <button onClick={()=>{setShowLogin(true)}} className="">Sign in</button>
          )}
        </div>
      </div>
    </>
  );
};
 
export default Navbar;
