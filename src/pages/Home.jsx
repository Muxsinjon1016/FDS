import React from "react";
import HomeCarousel from "../components/home/HomeCarousel";
import RestaurantCategories from "../components/home/restaurantCategories";
import MilliyTaomlar from "../components/home/milliyTaomlar";

const Home = () => {
  return (
    <div className=" max-w-[1300px] mt-[150px] mx-auto">
      <HomeCarousel />
      <RestaurantCategories />
      <MilliyTaomlar />
    </div>
  );
};

export default Home;
