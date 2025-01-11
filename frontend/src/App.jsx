import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";

import Navbar from "./components/UI/Navbar/Navbar";
import Footer from "./components/UI/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import MyOrders from "./components/MyOrder/MyOrders";


function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin} />
      <div className="app-element">
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
       <Route path="/myorders" element={<MyOrders /> } />
      </Routes>
      </div>
    </div>
    <Footer />
    </> 
  )
}

export default App
