import React from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Placeholder from "./components/Placeholder/Placeholder";
import Navbar from "./components/UI/Navbar/Navbar";


function App() {
  

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Placeholder />} />
      </Routes>
    </div>
  )
}

export default App
