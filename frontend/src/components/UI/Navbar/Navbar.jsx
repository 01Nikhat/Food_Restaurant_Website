
// import { useContext, useState, useEffect } from "react";
// import { assets } from "../../../assets/frontend_assets/assets";
// import "./Navbar.css";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { StoreContext } from "../../../context/StoreContext";

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("home");
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false); // State to control search bar visibility
//   const location = useLocation();

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
//         setScrolled(true);
//       }
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [menu]);

//   const isCartOrOrdersPage = location.pathname === "/Cart" || location.pathname === "/myorders";

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const toggleSearch = () => {
//     setSearchOpen(!searchOpen); // Toggle search bar visibility
//   };

//   return (
//     <div className={`navbar ${(menu === "cafe" || menu === "home") && !scrolled ? "transparent" : "scrolled"}`}>
//       <Link to="/">
//         <img className="logo" src={assets.logo || "/placeholder.svg"} alt="Logo" />
//       </Link>

//       <ul
//         className={`navbar-menu ${mobileMenuOpen ? "mobile-menu-open" : ""} ${(menu === "cafe" || menu === "home") && !scrolled ? "transparent-text" : ""}`}
//       >
//         <Link
//           style={{ color: isCartOrOrdersPage ? "darkred" : "" }}
//           to="/"
//           onClick={() => {
//             setMenu("home");
//             setMobileMenuOpen(false);
//           }}
//           className={menu === "home" ? "active" : ""}
//         >
//           HOME
//         </Link>
//         <a
//           href="#explore-menu"
//           style={{ color: isCartOrOrdersPage ? "darkred" : "" }}
//           onClick={() => {
//             setMenu("menu");
//             setMobileMenuOpen(false);
//           }}
//           className={menu === "menu" ? "active" : ""}
//         >
//           MENU
//         </a>
//         <Link
//           to="/cafe"
//           style={{ color: isCartOrOrdersPage ? "darkred" : "" }}
//           onClick={() => {
//             setMenu("cafe");
//             setMobileMenuOpen(false);
//           }}
//           className={menu === "cafe" ? "active" : ""}
//         >
//           CAFE & CAKESHOP
//         </Link>
//         <a
//           href="#footer"
//           style={{ color: isCartOrOrdersPage ? "darkred" : "" }}
//           onClick={() => {
//             setMenu("contact-us");
//             setMobileMenuOpen(false);
//           }}
//           className={menu === "contact-us" ? "active" : ""}
//         >
//           CONTACT
//         </a>
//       </ul>

//       <div className="navbar-right">
//         <div className={`navbar-search ${searchOpen ? "open" : ""}` } >
//           <input
//             type="text"
//             placeholder="Type here..."
//             className={`${(menu === "cafe" || menu === "home") && !scrolled ? "transparent-input" : ""} ${searchOpen ? "visible" : ""} ${(menu === "Cart" || menu === "myorders") ? "searchcolor" : ""}`}
//           />
//           <img
//             src={assets.search_icon || "/placeholder.svg"}
//             alt="Search Icon"
//             className={`search-icon ${(menu === "cafe" || menu === "home") && !scrolled ? "transparent-icon" : ""} ${(menu === "Cart" || menu === "myorders") ? "searchcolor" : ""}`}
//             onClick={toggleSearch}
//           />
//         </div>
//         <Link to="/Cart">
//           <div className="navbar-cart-icon">
//             <img
//               src={assets.basket_icon || "/placeholder.svg"}
//               alt="Cart Icon"
//               className={(menu === "cafe" || menu === "home") && !scrolled ? "transparent-icon" : ""}
//             />
//             <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//           </div>
//         </Link>
//         {!token ? (
//           <button
//             className={(menu === "cafe" || menu === "home") && !scrolled ? "transparent-button" : ""}
//             onClick={() => setShowLogin(true)}
//           >
//             Sign In
//           </button>
//         ) : (
//           <div className="navbar-profile">
//             <img
//               src={assets.profile_icon || "/placeholder.svg"}
//               alt="Profile Icon"
//               className={(menu === "cafe" || menu === "home") && !scrolled ? "transparent-icon" : ""}
//             />
//             <ul className="nav-profile-dropdown">
//               <li onClick={() => navigate("/myorders")}>
//                 <img src={assets.bag_icon || "/placeholder.svg"} alt="Orders Icon" />
//                 Orders
//               </li>
//               <hr />
//               <li onClick={logout}>
//                 <img src={assets.logout_icon || "/placeholder.svg"} alt="Logout Icon" />
//                 Logout
//               </li>
//             </ul>
//           </div>
//         )}

//         <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import { assets } from "../../../assets/frontend_assets/assets";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is on Cart or My Orders page
  const isCartOrOrdersPage = location.pathname === "/Cart" || location.pathname === "/myorders";
  // Check if user is on Home or Cafe page
  const isHomeOrCafePage = location.pathname === "/" || location.pathname === "/cafe";

  return (
    <div className={`navbar ${!scrolled && !isCartOrOrdersPage && !mobileMenuOpen ? "transparent" : "scrolled"}`}>
      <Link to="/">
        <img className="logo" src={assets.logo || "/placeholder.svg"} alt="Logo" />
      </Link>

      <ul className={`navbar-menu ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <Link to="/" className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>
          HOME
        </Link>
        <a href="#explore-menu" className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>
          MENU
        </a>
        <Link to="/cafe" className={menu === "cafe" ? "active" : ""} onClick={() => setMenu("cafe")}>
          CAFE & CAKESHOP
        </Link>
        <a href="#footer" className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>
          CONTACT
        </a>
      </ul>

      <div className="navbar-right">
        <div className={`navbar-search ${searchOpen ? "open" : ""}`}>
          <input type="text" placeholder="Search..." className={`${searchOpen ? "visible" : ""}`} />
          <img src={assets.search_icon || "/placeholder.svg"} alt="Search" className="search-icon" onClick={() => setSearchOpen(!searchOpen)} />
        </div>

        <Link to="/Cart">
          <div className="navbar-cart-icon">
            <img src={assets.basket_icon || "/placeholder.svg"} alt="Cart" />
            {getTotalCartAmount() > 0 && <div className="dot"></div>}
          </div>
        </Link>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon || "/placeholder.svg"} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon || "/placeholder.svg"} alt="Orders" /> Orders
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon || "/placeholder.svg"} alt="Logout" /> Logout
              </li>
            </ul>
          </div>
        )}

        <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className={isCartOrOrdersPage ? "dark-red" : (scrolled || mobileMenuOpen) ? "dark-red" : "white"}></div>
          <div className={isCartOrOrdersPage ? "dark-red" : (scrolled || mobileMenuOpen) ? "dark-red" : "white"}></div>
          <div className={isCartOrOrdersPage ? "dark-red" : (scrolled || mobileMenuOpen) ? "dark-red" : "white"}></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;




