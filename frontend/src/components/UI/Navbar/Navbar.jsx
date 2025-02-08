
// import React, { useContext, useState, useEffect } from 'react';
// import { assets } from "../../../assets/frontend_assets/assets";
// import "./Navbar.css";
// import { Link, useNavigate ,useLocation} from "react-router-dom";
// import { StoreContext } from '../../../context/StoreContext';

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("home");
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation(); // Get current path to check if it's /cart or /myorders

//   const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     navigate("/");
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (menu === "home" || menu === "cafe") {
//         setScrolled(window.scrollY > 50);
//       } else {
//         setScrolled(true); // Ensures navbar is white initially for other pages
//       }
//     };
  
//     handleScroll(); // Set initial state on page load
  
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [menu]); // Ensure it updates when the menu state changes
  
// // Check if current page is /cart or /myorders
// const isCartOrOrdersPage = location.pathname === '/Cart' || location.pathname === '/myorders';

//   return (
//     <div className={`navbar ${(menu === "cafe" || menu === "home") && !scrolled ? 'transparent' : 'scrolled'}`}>
//       <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>
//       <ul className={`navbar-menu ${(menu === "cafe" || menu === "home") && !scrolled ? 'transparent-text' : ''}`}>
        
//         <Link style={{ color: isCartOrOrdersPage ? "darkred" : "" }} to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>HOME</Link>
//         <a href='#explore-menu' style={{ color: isCartOrOrdersPage ? "darkred" : "" }} onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>MENU</a>
//         <Link to="/cafe" style={{ color: isCartOrOrdersPage ? "darkred" : "" }} onClick={() => setMenu("cafe")} className={menu === "cafe" ? "active" : ""}>CAFE & CAKESHOP</Link>
//         <a href='#footer' style={{ color: isCartOrOrdersPage ? "darkred" : "" }} onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>CONTACT</a>
//       </ul>
//       <div className="navbar-right">
//         <div className="navbar-search">
//           <input type="text" placeholder="Type here..." className={(menu === "cafe" || menu === "home") && !scrolled ? 'transparent-input' : ''} />
//           <img src={assets.search_icon} alt="Search Icon" className={`search-icon ${(menu === "cafe" || menu === "home") && !scrolled ? 'transparent-icon' : ''}`} />
//         </div>
//         <Link to='/Cart'>
//           <div className="navbar-cart-icon">
//             <img src={assets.basket_icon} alt="Cart Icon" className={(menu === "cafe" || menu === "home") && !scrolled ? 'transparent-icon' : ''} />
//             <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//           </div>
//         </Link>
//         {!token ? (
//           <button className={(menu === "cafe" || menu === "home") && !scrolled ? 'transparent-button' : ''} onClick={() => setShowLogin(true)}>Sign In</button>
//         ) : (
//           <div className='navbar-profile'>
//             <img src={assets.profile_icon} alt="Profile Icon" className={(menu === "cafe" || menu === "home") && !scrolled ? 'transparent-icon' : ''} />
//             <ul className='nav-profile-dropdown'>
//               <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="Orders Icon" />Orders</li>
//               <hr />
//               <li onClick={logout}><img src={assets.logout_icon} alt="Logout Icon" />Logout</li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

"use client"

"use client"

import { useContext, useState, useEffect } from "react";
import { assets } from "../../../assets/frontend_assets/assets";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // State to control search bar visibility
  const location = useLocation();

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (menu === "home" || menu === "cafe") {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(true);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menu]);

  const isCartOrOrdersPage = location.pathname === "/Cart" || location.pathname === "/myorders";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen); // Toggle search bar visibility
  };

  return (
    <div className={`navbar ${(menu === "cafe" || menu === "home") && !scrolled ? "transparent" : "scrolled"}`}>
      <Link to="/">
        <img className="logo" src={assets.logo || "/placeholder.svg"} alt="Logo" />
      </Link>

      <ul
        className={`navbar-menu ${mobileMenuOpen ? "mobile-menu-open" : ""} ${(menu === "cafe" || menu === "home") && !scrolled ? "transparent-text" : ""}`}
      >
        <Link
          style={{ color: isCartOrOrdersPage ? "darkred" : "" }}
          to="/"
          onClick={() => {
            setMenu("home");
            setMobileMenuOpen(false);
          }}
          className={menu === "home" ? "active" : ""}
        >
          HOME
        </Link>
        <a
          href="#explore-menu"
          style={{ color: isCartOrOrdersPage ? "darkred" : "" }}
          onClick={() => {
            setMenu("menu");
            setMobileMenuOpen(false);
          }}
          className={menu === "menu" ? "active" : ""}
        >
          MENU
        </a>
        <Link
          to="/cafe"
          style={{ color: isCartOrOrdersPage ? "darkred" : "" }}
          onClick={() => {
            setMenu("cafe");
            setMobileMenuOpen(false);
          }}
          className={menu === "cafe" ? "active" : ""}
        >
          CAFE & CAKESHOP
        </Link>
        <a
          href="#footer"
          style={{ color: isCartOrOrdersPage ? "darkred" : "" }}
          onClick={() => {
            setMenu("contact-us");
            setMobileMenuOpen(false);
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          CONTACT
        </a>
      </ul>

      <div className="navbar-right">
        <div className={`navbar-search ${searchOpen ? "open" : ""}`}>
          <input
            type="text"
            placeholder="Type here..."
            className={`${(menu === "cafe" || menu === "home") && !scrolled ? "transparent-input" : ""} ${searchOpen ? "visible" : ""}`}
          />
          <img
            src={assets.search_icon || "/placeholder.svg"}
            alt="Search Icon"
            className={`search-icon ${(menu === "cafe" || menu === "home") && !scrolled ? "transparent-icon" : ""}`}
            onClick={toggleSearch}
          />
        </div>
        <Link to="/Cart">
          <div className="navbar-cart-icon">
            <img
              src={assets.basket_icon || "/placeholder.svg"}
              alt="Cart Icon"
              className={(menu === "cafe" || menu === "home") && !scrolled ? "transparent-icon" : ""}
            />
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
        </Link>
        {!token ? (
          <button
            className={(menu === "cafe" || menu === "home") && !scrolled ? "transparent-button" : ""}
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img
              src={assets.profile_icon || "/placeholder.svg"}
              alt="Profile Icon"
              className={(menu === "cafe" || menu === "home") && !scrolled ? "transparent-icon" : ""}
            />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon || "/placeholder.svg"} alt="Orders Icon" />
                Orders
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon || "/placeholder.svg"} alt="Logout Icon" />
                Logout
              </li>
            </ul>
          </div>
        )}

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;



