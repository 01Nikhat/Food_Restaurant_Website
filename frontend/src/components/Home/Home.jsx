import React, { useState, useRef } from 'react';
import "./Home.css";
import Header from '../UI/Header/Header';
import ExploreMenu from '../ExploreMenu/ExploreMenu';
import FoodDisplay from '../foodDisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState("All");
  const exploreMenuRef = useRef(null);

  const scrollToExploreMenu = () => {
    if (exploreMenuRef.current) {
      exploreMenuRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header scrollToExploreMenu={scrollToExploreMenu} />
      <div ref={exploreMenuRef}>
        <ExploreMenu />
      </div>
      <FoodDisplay />
    </div>
  );
};

export default Home;
