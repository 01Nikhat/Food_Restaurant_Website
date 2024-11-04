import React, { useContext, useState } from 'react';
import "./FoodItem.css";
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id, name, price, description, image}) => {
  
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url+"/images/"+image} alt="" />
          {
            !cartItems[id] ?  
              <img onClick={()=>addToCart(id)} className='add' src={assets.add_icon_white} alt="Add Icon" /> :
              <div className="food-item-container">
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="Remove Icon" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="Add Icon" />
              </div>
          }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating Stars" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className='food-item-price'>₹{price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
