import React from "react";
import HomeCarousel from "../../../home/HomeCarousel";
import axios from "axios";
import RenderOrdered from "../../renderOrdered";

export const Orders = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/api/orders")
      .then((res) => setData(res.data));
  }, []);

  return (
    <>
      <div className="">
        <div className="flex">
          <div className="w-[43%]">
            <HomeCarousel />
          </div>
          <div className="border-4 w-[55%] ml-auto px-14 py-6 rounded-[20px]">
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
        <div>
          <div>
            {/* {data?.map((order) => (
              <RenderOrdered key={order.id} {...order} />
            ))} */}
            <RenderOrdered />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
