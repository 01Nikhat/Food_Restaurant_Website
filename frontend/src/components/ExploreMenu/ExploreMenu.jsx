import React from 'react';
import "./ExploreMenu.css";
import {menu_list} from "../../assets/frontend_assets/assets" ;
import { assets } from "../../assets/frontend_assets/assets";


const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
      <img src={assets.shape1} width="246" height="412" loading="lazy" alt="shape"
            className="shape shape-1 move-anim" />
      <img src={assets.shape2} width="343" height="345" loading="lazy" alt="shape"
            className="shape shape-2 move-anim" />
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>choose from a diverse menu featuring a delectable array of dishes. Our mission is to </p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
          return (
                  // prev => prev === item.menu_name ? "All" : item.menu_name
                //This is an arrow function that takes the previous value of category (denoted as prev).
                //It checks if the previous value of category is equal to item.menu_name
                //previous value of category is All
            <div onClick={()=>setCategory(prev => prev ===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category === item.menu_name?"active":""} src={item.menu_image} alt="" />
                
                <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
          
      <hr />

    </div>
  )
}

export default ExploreMenu
