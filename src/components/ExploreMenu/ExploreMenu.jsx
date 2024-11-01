import React from 'react';
import "./ExploreMenu.css";
import {menu_list} from "../../assets/frontend_assets/assets" ;

const ExploreMenu = () => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>choose from a diverse menu featuring a delectable array of dishes. Our mission is to </p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
          return (
            <div key={index} className="explore-menu-list-item">
                <img src={item.menu_image} alt="" />
                <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExploreMenu
