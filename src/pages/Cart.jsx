import React from "react";
import { loadState } from "../config/storage";
import RenderOrders from "../components/cart/renderOrders";
import axios from "axios";

export const Cart = () => {
  const orderedItem = loadState("cart") || [];
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/api/carts")
      .then((res) => setData(res.data));
  }, []);

  return (
    <>
      <div className="container mt-[150px] flex items-start justify-between">
        <div className="w-[70%]">
          {orderedItem?.map((order) => (
            <RenderOrders key={order.id} {...order} />
          ))}
        </div>
        <div className="flex justify-between">
          <div className="border-4 ml-auto px-14 py-6 rounded-[20px]">
            <ul>
              <li className="text-xl flex justify-between mb-4">
                Subtotal: <b>120 000 UZS</b>
              </li>
              <li className="text-xl mb-4 flex justify-between">
                Delivery fee: <b>12 000 UZS</b>
              </li>
              <li className="text-xl pb-4 border-b-2 mb-6 flex justify-between">
                Promo code: <b>No</b>
              </li>
              <li className="text-3xl font-semibold mb-10 flex justify-between">
                Total: 132 000 UZS
              </li>
              <button className="text-white bg-yellow-400 hover:bg-yellow-300 block mx-auto w-full mb-3 rounded-12 py-3 font-medium text-xl">
                Check out now
              </button>
              <button className="text-white bg-blue-700 hover:bg-blue-600 block mx-auto w-full rounded-12 py-3 font-medium text-xl">
                Buy in one click
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
