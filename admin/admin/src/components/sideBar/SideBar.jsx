import React from 'react';
import "./SideBar.css"
import { assets } from '../../assets/assets';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <dov className="sidebar-options">

        <div className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Item</p>
        </div>
        <div className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Item</p>
        </div>
        <div className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </div>

      </dov>
    </div>
  )
}

export default SideBar
