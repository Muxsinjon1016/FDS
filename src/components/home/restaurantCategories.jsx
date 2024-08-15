import React, { useState, useEffect } from "react";
import axios from "axios";

export const RestaurantCategories = () => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/categoryRes")
      .then((response) => {
        const mainData = response.data.data;
        setRestaurantsData(mainData);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setError("Failed to load data. Please try again later.");
      });
  }, []);

  return (
    <div className="bg-gray-300 rounded-12 py-4 px-2 mt-[75px]">
      {restaurantsData.map((restaurants) => (
        <a
          key={restaurants.id}
          className="py-2 px-4 mr-4 font-medium text-lg hover:bg-gray-100 bg-white rounded-12"
          href={`#${restaurants.name.replace(/\s+/g, "")}`}
        >
          {restaurants.name}
        </a>
      ))}
    </div>
  );
};

export default RestaurantCategories;
