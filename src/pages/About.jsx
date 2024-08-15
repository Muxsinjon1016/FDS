import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToList, addToUserMinus } from "../store/adTo";
import FoodsCategory from "../components/home/foodsCategory";
import AllFoods from "../components/home/allFoods";
import { FaStar } from "react-icons/fa6";
import { SiPostman } from "react-icons/si";
import { BsFillInfoCircleFill } from "react-icons/bs";

const About = () => {
  const location = useLocation();
  const { restaurant } = location.state || {};
  const dispatch = useDispatch();
  const list = useSelector((state) => state.addTo.list);

  const handleAddToCart = (item) => {
    dispatch(addToList(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(addToUserMinus(item));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!restaurant) return <div>No restaurant data available.</div>;

  return (
    <div className="max-w-[1300px] mx-auto mt-[150px] p-4">
      <div className="border relative border-gray-200 h-[550px] rounded-lg overflow-hidden shadow-lg p-6">
        <img
          src={`http://localhost:4000/${restaurant.image}`}
          alt={restaurant.name}
          className="w-[90%] mx-auto rounded-12 h-[350px] object-cover mb-4"
        />
        <div className="absolute bottom-52 left-32 text-white">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
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
                  {restaurant.rating}
                </span>
              </li>
              <li className="flex text-black items-center bg-gray-100 shadow-lg rounded-20 py-2 px-4 h-[65px] gap-3">
                <BsFillInfoCircleFill className="w-[32px] h-auto" />
              </li>
            </ul>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
        <p className="text-gray-600 mb-4">{restaurant.address}</p>
        <p className="text-gray-600 mb-4">{restaurant.description}</p>
      </div>

      {/* Food Items */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Food Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {restaurant.foods.map((food) => {
            const itemInCart = list.find((item) => item.id === food.id);
            const itemAmount = itemInCart ? itemInCart.amount : 0;

            return (
              <div
                key={food.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-lg p-4"
              >
                <img
                  src={`http://localhost:4000/${food.image}`}
                  alt={food.name}
                  className="w-full h-40 object-cover mb-4"
                />
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
            );
          })}
        </div>
      </div>
      <FoodsCategory />
      <AllFoods />
    </div>
  );
};

export default About;
