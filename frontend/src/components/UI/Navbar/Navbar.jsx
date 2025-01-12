import React, { useContext, useState, useEffect } from 'react';
import { assets } from "../../../assets/frontend_assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Adjust scroll threshold as needed
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>HOME</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>MENU</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>CAFE & CAKESHOP</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>CONTACT</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search">
          <input type="text" placeholder="Type here..." />
          <img src={assets.search_icon} alt="Search Icon" className="search-icon" />
        </div>
        <Link to='/Cart'>
          <div className="navbar-cart-icon">
            <img src={assets.basket_icon} alt="Cart Icon" />
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="Orders Icon" />Orders</li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="Logout Icon" />Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
