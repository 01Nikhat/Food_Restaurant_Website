import React from "react";
import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/sideBar/SideBar";
import {Route, Routes} from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Order/Order";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const url = "https://food-restaurant-website-backend.onrender.com";

  return (
    <div>
      <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
         <SideBar />
         <Routes >
            <Route path="/add" element={<Add  url={url}/>} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/order" element={<Order url={url} />} />
            
         </Routes>
        </div>
       
    </div>
  )
}

export default App
