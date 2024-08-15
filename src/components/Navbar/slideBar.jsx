import React from "react";
import { SlBasket } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

export const SlideBar = ({ slideBar }) => {
  return (
    <>
      <div
        onClick={() => slideBar()}
        className="absolute h-full backdrop-blur-md inset-0"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="space-y-4 pt-16 w-[80%] bg-gray-300 min-h-screen relative p-4 rounded-l-12 ml-auto"
        >
          <p onClick={() => slideBar()} className="absolute font-bold top-3 left-5 text-3xl">
            x
          </p>
          <div className="bg-slate-200 relative flex justify-center items-center rounded-full p-3">
            <SlBasket className="w-5 h-5 text-blue-950 cursor-pointer" />
            <span className="absolute top-1 right-1 p-1 w-4 h-4 text-[10px] bg-blue-950 flex justify-center items-center text-white rounded-full"></span>
          </div>
          <div className="bg-slate-200 flex justify-center items-center rounded-full p-3">
            <CiLocationOn
              className="w-5 h-5 text-blue-950 cursor-pointer"
              onClick={() => setIsSticky(true)}
            />
          </div>
          <div
            className="bg-slate-200 flex justify-center items-center rounded-full p-3"
            onClick={() => setShow(true)}
          >
            <FaRegUser className="w-5 h-5 text-blue-950 cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideBar;
