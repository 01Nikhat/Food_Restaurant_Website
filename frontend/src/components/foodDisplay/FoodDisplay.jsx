import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';


const FoodDisplay = ({category}) => {
  const {food_list} = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
          //if user kisi item par click nhi karega to category = All hoga but agar user kisi item par click karta hai like cake par then only cake item will show on the UI so category = cake ho jayega 
          if (category ==="All" || category===item.category) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}  />
          }
          
        })}
      </div>
      
    </div>
  )
}

export default FoodDisplay
