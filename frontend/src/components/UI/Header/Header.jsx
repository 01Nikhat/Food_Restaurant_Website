import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "./Header.css";
import slider1 from "../../../assets/frontend_assets/slider1.jpg";
import slider2 from "../../../assets/frontend_assets/slider2.jpg";
import slider3 from "../../../assets/frontend_assets/slider3.jpg";

const Header = () => {
  const images = [slider1, slider2, slider3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="header">
      <div
        className="header-image"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="header-contents">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="animation"
        >
          Order Your Favourite Food Here
        </motion.h2>
        
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="animation"
        >
          Choose from a diverse menu featuring a delectable array of dishes crafted
          with the finest ingredients, satisfying your cravings and elevating your
          dining experience, one delicious meal at a time.
        </motion.p>
        
        <motion.button
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="btn animation"
        >
          View Menu
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
