import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToList, addToUserPlus, addToUserMinus } from "../../store/adTo";
import useGetFoods from "./services/useGetFoods";

export const AllFoods = () => {
  const { data } = useGetFoods();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.addTo.list);

  const handleRemoveFromCart = (item) => {
    dispatch(addToUserMinus(item));
  };

  const handleAddToCart = (item) => {
    dispatch(addToList(item));
  };

  return (
    <>
      <div className="flex justify-evenly items-center mt-10 gap-5 flex-wrap">
        {data?.map((item) => {
          const itemInCart = list.find((cartItem) => cartItem.id === item.id);
          const itemAmount = itemInCart ? itemInCart.amount : 0;

          return (
            <div className="shadow-md w-[240px] overflow-hidden rounded-6 border-2 p-5 border-gray-300">
              <img
                className="w-[240px] h-[140px] mx-auto"
                src={item.image}
                alt="img"
              />
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">{item.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-bold mb-4">{item.price} USD</p>
                <div>
                  {itemAmount > 0 ? (
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-200 text-black py-1 px-2 rounded-lg border border-gray-300 hover:bg-gray-300"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        -
                      </button>
                      <span>{itemAmount}</span>
                      <button
                        className="bg-gray-200 text-black py-1 px-2 rounded-lg border border-gray-300 hover:bg-gray-300"
                        onClick={() => handleAddToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="mt-2 bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200 ease-in-out"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllFoods;
