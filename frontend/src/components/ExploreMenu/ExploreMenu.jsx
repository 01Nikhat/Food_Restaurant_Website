// import React from 'react';
// import "./ExploreMenu.css";
// import { menu_list } from "../../assets/frontend_assets/assets";
// import { assets } from "../../assets/frontend_assets/assets";

// const ExploreMenu = ({ category, setCategory }) => {
//   return (
//     <div className='explore-menu' id='explore-menu'>
//       <img src={assets.shape1} width="246" height="412" loading="lazy" alt="shape"
//         className="shape shape-1 move-anim" />
//       <img src={assets.shape2} width="343" height="345" loading="lazy" alt="shape"
//         className="shape shape-2 move-anim" />
//       <h1>Explore our Menu</h1>
//       <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings.</p>
      
//       {/* Main Menu Button */}
//       <button onClick={() => setCategory("All")} className="main-menu-button">
//         Main Menu
//       </button>

//       <div className="explore-menu-list">
//         {menu_list.map((item, index) => {
//           return (
//             <div
//               onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
//               key={index}
//               className="explore-menu-list-item"
//             >
//               <img
//                 className={category === item.menu_name ? "active" : ""}
//                 src={item.menu_image}
//                 alt={item.menu_name}
//               />
//               <p>{item.menu_name}</p>
//             </div>
//           );
//         })}
//       </div>

//       <hr />
//     </div>
//   );
// };

// export default ExploreMenu;


// import "./ExploreMenu.css"
// import { menu_list, assets } from "../../assets/frontend_assets/assets"

// const ExploreMenu = ({ category, setCategory }) => {
//   const handleCategoryClick = (menuName) => {
//     console.log("Setting category to:", menuName)
//     setCategory(menuName)
//   }

//   return (
//     <div className="explore-menu" id="explore-menu">
//       <img
//         src={assets.shape1 || "/placeholder.svg"}
//         width="246"
//         height="412"
//         loading="lazy"
//         alt="shape"
//         className="shape shape-1 move-anim"
//       />
//       <img
//         src={assets.shape2 || "/placeholder.svg"}
//         width="343"
//         height="345"
//         loading="lazy"
//         alt="shape"
//         className="shape shape-2 move-anim"
//       />
//       <h1>Explore our Menu</h1>
//       <p className="explore-menu-text">
//         Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings.
//       </p>

//       <button onClick={() => handleCategoryClick("All")} className="main-menu-button">
//         Main Menu
//       </button>

//       <div className="explore-menu-list">
//         {menu_list.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => handleCategoryClick(item.menu_name)}
//             className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}
//           >
//             <img src={item.menu_image || "/placeholder.svg"} alt={item.menu_name} />
//             <p>{item.menu_name}</p>
//           </div>
//         ))}
//       </div>

//       <hr />
//     </div>
//   )
// }

// export default ExploreMenu




import { useContext } from "react";
import "./ExploreMenu.css";
import { menu_list, assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = () => {
  const { category, setCategory ,setSearchQuery } = useContext(StoreContext);

  const handleCategoryClick = (menuName) => {
    console.log("Setting category to:", menuName);
    setCategory(menuName);
    setSearchQuery(""); // Clear the search query

  };

  return (
    <div className="explore-menu" id="explore-menu">
      <img
        src={assets.shape1 || "/placeholder.svg"}
        width="246"
        height="412"
        loading="lazy"
        alt="shape"
        className="shape shape-1 move-anim"
      />
      <img
        src={assets.shape2 || "/placeholder.svg"}
        width="343"
        height="345"
        loading="lazy"
        alt="shape"
        className="shape shape-2 move-anim"
      />
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings.
      </p>

      <button onClick={() => handleCategoryClick("All")} className="main-menu-button btn">
        Main Menu
      </button>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(item.menu_name)}
            className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}
          >
            <img src={item.menu_image || "/placeholder.svg"} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;

