import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToList, addToUserMinus } from "../store/adTo";
import RestaurantCategories from "../components/home/restaurantCategories";
import MilliyTaomlar from "../components/home/milliyTaomlar";
import FoodsCategory from "../components/home/foodsCategory";
import AllFoods from "../components/home/allFoods";
import { FaStar } from "react-icons/fa6";
import { SiPostman } from "react-icons/si";
import { BsFillInfoCircleFill } from "react-icons/bs";

const Menu = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.addTo.list);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/restaurants")
      .then((response) => {
        const mainData = response.data.data;
        setRestaurantsData(mainData);
        if (mainData.length > 0) {
          setSelectedRestaurant(mainData[0]); // Set the first restaurant as the default
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToList(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(addToUserMinus(item));
  };

  const handleRestaurantChange = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Filter food data based on the selected restaurant
  const foodsData = selectedRestaurant ? selectedRestaurant.foods : [];

  return (
    <div className="max-w-[1300px] mx-auto mt-[150px]">
      {/* Restaurant Selector */}
      <RestaurantCategories />
      <MilliyTaomlar />

      {/* Restaurant Info */}
      {selectedRestaurant && (
        <div className="relative mb-10">
          <img
            src={`http://localhost:4000/${selectedRestaurant.image}`}
            alt={selectedRestaurant.name}
            className="w-full h-60 object-cover rounded-lg"
          />
          <div className="absolute bottom-5 left-10 text-white">
            <h1 className="text-3xl font-bold">{selectedRestaurant.name}</h1>
            <div className="flex items-center mt-2">
              <ul className="flex items-center gap-4">
                <li className="flex text-black items-center bg-gray-100 shadow-lg rounded-20 py-2 px-4 w-[150px] gap-3">
                  <SiPostman className="w-[32px] h-auto" />
                  <p className="text-xl font-semibold">
                    20-30 <span className="text-md text-gray-500">min</span>
                  </p>
                </li>
                <li className="flex text-black items-center bg-gray-100 shadow-lg rounded-20 py-2 px-4 w-[100px] h-[68px] gap-3">
                  <FaStar className="w-[32px] text-yellow-300 h-auto" />
                  <span className="mr-2 flex items-center gap-2 text-lg">
                    {selectedRestaurant.rating}
                  </span>
                </li>
                <li className="flex text-black items-center bg-gray-100 shadow-lg rounded-20 py-2 px-4 h-[65px] gap-3">
                  <BsFillInfoCircleFill className="w-[32px] h-auto" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Food Items Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foodsData.map((food) => {
          const itemInCart = list.find((item) => item.id === food.id);
          const itemAmount = itemInCart ? itemInCart.amount : 0;

          return (
            <div
              key={food.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={`http://localhost:4000/${food.image}`}
                alt={food.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="text-md font-bold mb-2">{food.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{food.description}</p>
                <p className="text-lg font-bold mb-4">{food.price} USD</p>
                {itemAmount > 0 ? (
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-gray-200 text-black py-1 px-2 rounded-lg border border-gray-300 hover:bg-gray-300"
                      onClick={() => handleRemoveFromCart(food)}
                    >
                      -
                    </button>
                    <span>{itemAmount}</span>
                    <button
                      className="bg-gray-200 text-black py-1 px-2 rounded-lg border border-gray-300 hover:bg-gray-300"
                      onClick={() => handleAddToCart(food)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-2 bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200 ease-in-out"
                    onClick={() => handleAddToCart(food)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h3 className="text-3xl font-medium mb-5 mt-10">Select foods</h3>
        <FoodsCategory />
        <AllFoods />
      </div>
    </div>
  );
};

export default Menu;
