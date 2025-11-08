import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

<<<<<<< Updated upstream
const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const {getTotalCartAmount, token, setToken, setSearchTerm} = useContext(StoreContext);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };
=======

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home"); 

  const {getTotalCartAmount,token ,setToken}= useContext(StoreContext);

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");

  }
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
          {token ? (
            <div className="profile-container">
              <img src={assets.profile_icon} alt="profile" className="profile-icon" />
              <div className="dropdown">
                <Link to="/myorders" className="dropdown-item">Orders</Link>
                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
              </div>
            </div>
          ) : (
            <button onClick={()=>{setShowLogin(true)}} className="">Sign in</button>
          )}
=======
          {!token?<button onClick={()=>{setShowLogin(true)}}   className="">Sign in</button>:<div className="navbar-profile">
             <img src = {assets.profile_icon} alt=""/>
             <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr/>
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
             </ul>
             </div>
            }
          
>>>>>>> Stashed changes
        </div>
      </div>
    </>
  );
};
 
export default Navbar;
