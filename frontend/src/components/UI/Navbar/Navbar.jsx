
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import { assets } from "../../../assets/frontend_assets/assets";
import "./Navbar.css";

const Navbar = ({ setShowLogin ,showLogin}) => {
  console.log("showlogin at navbar",showLogin);
  
  const [menu, setMenu] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  //const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
 // const { searchQuery, setSearchQuery } = useContext(StoreContext);
  //const [localSearchQuery, setLocalSearchQuery] = useState("");

  // Usage in Navbar or Search Component



  const { getTotalCartAmount, token, setToken  } = useContext(StoreContext);

  //using on searchbar
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };
  
  // const debouncedSearchQuery = useDebounce(localSearchQuery, 100);
  // useEffect(() => {
  //   setSearchQuery(debouncedSearchQuery);
  // }, [debouncedSearchQuery]);


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

  // Handle search form submission
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setSearchQuery(localSearchQuery); // Update the global search query
  //   scrollToFoodDisplay(); // Scroll to the FoodDisplay component
  //   //setCategory("");
    
  // };

  // Scroll to the FoodDisplay section
  const scrollToFoodDisplay = () => {
    const foodDisplayElement = document.getElementById("food-display");
    if (foodDisplayElement) {
      foodDisplayElement.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        {/* Search Form */}
{/*         <form onSubmit={handleSearch} className={`navbar-search ${searchOpen ? "open" : ""}`}>
          <input
            type="text"
            placeholder="Search..."
            className={`${searchOpen ? "visible" : ""}`}
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
          <img
            src={assets.search_icon || "/placeholder.svg"}
            alt="Search"
            className="search-icon"
            type="submit" // Make the icon act as a submit button
            onClick={() => setSearchOpen(!searchOpen)}
          />
        </form> */}

        <Link to="/Cart">
          <div className="navbar-cart-icon">
            <img src={assets.basket_icon || "/placeholder.svg"} alt="Cart" />
            {getTotalCartAmount() > 0 && <div className="dot"></div>}
          </div>
        </Link>

        {!token ? (
          <>
          <button className="desktop-signin" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
          <button className="mobile-signin" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        </>
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



