import React from 'react';
import "./Footer.css";
import { assets } from '../../../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
     <div className='footer-content'>
        <div className='footer-content-left'>
            <img className='logo' src={assets.logo} alt="" />
            <p>Thank You for visiting Our restaurant </p>
            <div className="footer-social-icon">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>

        <div className='footer-content-right'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='footer-content-center'>

          <h2>Get In Touch</h2>
          <ul>
            <li>9123013848</li>
            <li>nikhat.parvin013@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">copyright 2024 © NikkiKitechen.com - All Right Resserved</p>
    </div>

  )
}

export default Footer
