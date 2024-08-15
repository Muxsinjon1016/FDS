import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToList,
  addToUserPlus,
  addToUserMinus,
  addToRemoveFromCart,
} from "../../store/adTo";
import { MdDeleteSweep } from "react-icons/md";

export const RenderOrders = ({ name, price }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.addTo.list);

  const handleRemoveFromCart = () => {
    dispatch(addToUserMinus({ name, price }));
  };

  const handleAddToCart = () => {
    dispatch(addToList({ name, price }));
  };

  const handleDeleteFromCart = () => {
    dispatch(addToRemoveFromCart({ name, price }));
  };

  const itemInCart = list.find(
    (cartItem) => cartItem.name === name && cartItem.price === price
  );
  const itemAmount = itemInCart ? itemInCart.amount : 0;

  const imageUrl =
    name === "lag'mon"
      ? "https://daryo.uz/cache/2020/07/Lifehacker-7-800x468.jpg"
      : name === "osh"
      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCyb0clmFYHEslLaUor8e847ja_SF665FNw&s"
      : "";

  return (
    <>
      <div className="flex items-center justify-between px-7 border-2 mb-5 py-4 rounded-20">
        <img src={imageUrl} alt={name} className="w-[50px] h-[50px]" />
        <h4 className="font-bold text-xl ">{name}</h4>
        <div>
          <div className="flex items-center space-x-2">
            <button
              className="bg-gray-200 text-black py-1 px-2 rounded-lg border border-gray-300 hover:bg-gray-300"
              onClick={() => handleRemoveFromCart(price)}
            >
              -
            </button>
            <span>{itemAmount}</span>
            <button
              className="bg-gray-200 text-black py-1 px-2 rounded-lg border border-gray-300 hover:bg-gray-300"
              onClick={() => handleAddToCart(price)}
            >
              +
            </button>
          </div>
        </div>
        <p className="font-medium">{itemAmount * price}</p>
        <div>
          <button
            onClick={() => handleDeleteFromCart(price)}
            className="p-2 hover:bg-gray-200 transition-all duration-500 rounded-12"
          >
            <MdDeleteSweep className="w-[32px] h-auto text-blue-700 transition-all duration-300 hover:text-blue-600" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RenderOrders;
