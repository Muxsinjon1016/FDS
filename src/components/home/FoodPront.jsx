import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToList, addToUserPlus, addToUserMinus } from "../../store/adTo";
import { useNavigate } from "react-router-dom";

const FoodPront = () => {
  const scrollContainerRef = useRef(null);
  const foodScrollContainerRef = useRef(null);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.addTo.list);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  const scrollFoodLeft = () => {
    foodScrollContainerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollFoodRight = () => {
    foodScrollContainerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  const [restaurantsData, setRestaurantsData] = useState([]);
  const [foodsData, setFoodsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/restaurants")
      .then((response) => {
        const mainData = response.data.data;
        setRestaurantsData(mainData);

        const allFoods = mainData.flatMap((restaurant) => restaurant.foods);
        setFoodsData(allFoods);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setError("Failed to load data. Please try again later.");
      });
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToList(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(addToUserMinus(item));
  };

  const handleNavigate = (restaurant) => {
    navigate(`/about/${restaurant.id}`, { state: { restaurant } });
  };

  return (
    <div id="Millytaomlar" className="mt-10 max-w-full">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
            <div className="relative">
              <IoIosArrowBack
                className="w-8 h-8 cursor-pointer absolute top-1/2 left-0 transform -translate-y-1/2 text-purple-600"
                onClick={scrollLeft}
              />
              <div
                ref={scrollContainerRef}
                className="flex gap-6 px-10 overflow-x-auto whitespace-nowrap py-2 w-full hide-scrollbar"
              >
                {restaurantsData.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 min-w-[300px] max-w-[300px] cursor-pointer"
                    onClick={() => handleNavigate(restaurant)} // Navigate to About page on click
                  >
                    <img
                      src={`http://localhost:4000/${restaurant.image}`}
                      alt={restaurant.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {restaurant.address}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          Rating: {restaurant.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <MdOutlineNavigateNext
                className="w-10 h-10 cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2 text-purple-600"
                onClick={scrollRight}
              />
            </div>
          </div>

          {/* Food Items Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Food Items</h2>
            <div className="relative">
              <IoIosArrowBack
                className="w-8 h-8 cursor-pointer absolute top-1/2 left-0 transform -translate-y-1/2 text-purple-600"
                onClick={scrollFoodLeft}
              />
              <div
                ref={foodScrollContainerRef}
                className="flex gap-6 px-10 overflow-x-auto whitespace-nowrap py-2 w-full hide-scrollbar"
              >
                {foodsData.map((food) => {
                  const itemInCart = list.find((item) => item.id === food.id);
                  const itemAmount = itemInCart ? itemInCart.amount : 0;

                  return (
                    <div
                      key={food.id}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 min-w-[300px] max-w-[300px]"
                    >
                      <img
                        src={`http://localhost:4000/${food.image}`}
                        alt={food.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-md font-bold mb-2">{food.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {food.description}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          {food.price} USD
                        </p>
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
              <MdOutlineNavigateNext
                className="w-10 h-10 cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2 text-purple-600"
                onClick={scrollFoodRight}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodPront;
