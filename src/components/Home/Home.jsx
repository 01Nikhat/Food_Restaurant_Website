import React, { useState } from 'react';
import "./Home.css";
import Header from '../UI/Header/Header';
import ExploreMenu from '../ExploreMenu/ExploreMenu';
import FoodDisplay from '../foodDisplay/FoodDisplay';


const Home = () => {
  const [category,setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default Home
