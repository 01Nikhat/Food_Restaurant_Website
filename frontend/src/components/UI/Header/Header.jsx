import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "./Header.css";
import { assets } from '../../../assets/frontend_assets/assets';

const Header = () => {
  const images = [assets.slider1, assets.slider2, assets.slider3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        >
          Order Your Favourite Food Here
        </motion.h2>
        
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Choose from a diverse menu featuring a delectable array of dishes crafted
          with the finest ingredients.
        </motion.p>
        
        <motion.button
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="btn"
        >
          View Menu
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
