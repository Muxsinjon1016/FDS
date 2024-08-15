import React, { useEffect, useState } from "react";
import { SiPostman } from "react-icons/si";
import { FaStar } from "react-icons/fa6";
import { BsFillInfoCircleFill } from "react-icons/bs";

export const OrderedProducts = () => {
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    const storedEndTime = localStorage.getItem("endTime");

    if (storedEndTime) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeRemaining = storedEndTime - currentTime;
      setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
    } else {
      const endTime = Math.floor(Date.now() / 1000) + 1800;
      localStorage.setItem("endTime", endTime);
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      localStorage.removeItem("endTime");
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <div className="container">
        <div className="relative">
          <img
            className="rounded-12 mx-auto w-[800px] h-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy9-bBKRkTFQcaP_rgQdp8565GHICC5W9QYg&s"
            alt="banner"
          />
          <div className="absolute bottom-5 left-44">
            <ul className="flex items-center gap-4">
              <li className="flex items-center bg-gray-100 shadow-lg rounded-20 py-2 px-4 w-[150px] gap-3">
                <SiPostman className="w-[32px] h-auto" />
                <p className="text-xl font-semibold">
                  20-30 <span className="text-md text-gray-500">min</span>
                </p>
              </li>
              <li className="flex items-center bg-gray-100 shadow-lg rounded-20 py-2 px-4 w-[150px] gap-3">
                <FaStar className="w-[32px] text-yellow-300 h-auto" />
                <p className="text-xl font-semibold">
                  4.5 <span className="text-md text-gray-500">200+</span>
                </p>
              </li>
              <li className="flex items-center bg-gray-100 shadow-lg rounded-20 py-2 px-4 h-[65px] gap-3">
                <BsFillInfoCircleFill className="w-[32px] h-auto" />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="border-4 mt-5 py-3 flex pr-5 items-center justify-between rounded-20">
            <div className="flex items-center gap-16">
              <img
                className="w-[200px] h-auto"
                src="https://cp.ectn.uz/files//freshburger_kur_wb.png"
                alt="food"
              />
              <h4 className="text-3xl max-w-[360px]">Burger</h4>
            </div>
            <div className="clock">
              {timeLeft > 0 && (
                <h4 className="text-2xl font-bold py-2 px-4 bg-gray-200 rounded-12 hover:bg-gray-100 cursor-default">
                  {formatTime(timeLeft)}
                </h4>
              )}
            </div>
            <h4 className="text-2xl font-bold italic">
              {timeLeft > 0 ? "Delivering..." : "Muxsinjon"}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderedProducts;
