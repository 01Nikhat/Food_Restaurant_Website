import React from 'react';
import './Cafe.css'; // Make sure to create a corresponding CSS file
import { assets } from '../../assets/frontend_assets/assets';

const Cafe = () => {
  return (
    <div className="cafe">
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <img src={assets.cafeSlide} alt="Cafe Interior" className="hero-image" />
          <div className="hero-text">
            <h1>Welcome to Cafe Delight</h1>
            <p>Experience the finest coffee and pastries in town</p>
            <a href="#menu" className="btn">Explore Menu</a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu">
        <h2>Our Menu</h2>
        <div className="menu-items">
          <div className="menu-item">
            <img src={assets.coffee} alt="Coffee" />
            <h3>Espresso</h3>
            <p>Rich and bold espresso shot</p>
          </div>
          <div className="menu-item">
            <img src={assets.cake} alt="Pastry" />
            <h3>Croissant</h3>
            <p>Freshly baked buttery croissant</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <div className="about-content">
          <img src={assets.cafe} alt="Cafe Interior" />
          <p>
            Cafe Delight has been serving the community since 2010. We pride ourselves on using the finest ingredients to create delicious coffee and pastries. Our cozy atmosphere is perfect for relaxing and enjoying a good book or catching up with friends.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Have any questions? Feel free to reach out to us!</p>
        <form>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2023 Cafe Delight. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Cafe;