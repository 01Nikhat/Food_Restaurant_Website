// import React, { useContext } from 'react';
// import "./FoodDisplay.css";
// import { StoreContext } from '../../context/StoreContext';
// import FoodItem from '../FoodItem/FoodItem';

// const FoodDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   return (
//     <div className='food-display' id='food-display'>
//       <h2>Top dishes near you</h2>
//       <div className="food-display-list">
//         {food_list.map((item, index) => {
//           // Show all items if category is "All", otherwise filter by category
//           if (category === "All" || category === item.category) {
//             return (
//               <FoodItem
//                 key={index}
//                 id={item._id}
//                 name={item.name}
//                 description={item.description}
//                 price={item.price}
//                 image={item.image}
//               />
//             );
//           }
//           return null; // Skip items that don't match the category
//         })}
//       </div>
//     </div>
//   );
// };

// export default FoodDisplay;

"use client"

"use client"

import { useContext } from "react"
import "./FoodDisplay.css"
import { StoreContext } from "../../context/StoreContext"
import FoodItem from "../FoodItem/FoodItem"

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)

  console.log("Current category:", category)
  console.log("All food items:", food_list)

  const filteredFoodList =
    category === "All"
      ? food_list
      : food_list.filter((item) => {
          const itemCategory = item.category.toLowerCase().trim()
          const selectedCategory = category.toLowerCase().trim()
          console.log(`Comparing ${itemCategory} with ${selectedCategory}`)
          return itemCategory === selectedCategory
        })

  console.log("Filtered food list:", filteredFoodList)

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you ({category})</h2>
      <p>Showing {filteredFoodList.length} items</p>
      <div className="food-display-list">
        {filteredFoodList.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay

