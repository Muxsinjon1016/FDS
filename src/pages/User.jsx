import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const User = () => {
  return (
    <>
      <div className="mt-[150px] flex justify-between">
        <div className="w-[20%] rounded-r-20 fixed top-[160px] left-0 bg-blue-700 text-white h-[605px] p-7 -mt-8">
          <NavLink
            className="block font-semibold text-2xl mb-2 transition-all duration-300 py-2 px-4 rounded-12 bg-transparent hover:bg-gray-200 hover:text-black hover:scale-105"
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className="block font-semibold text-2xl mb-2 transition-all duration-300 py-2 px-4 rounded-12 bg-transparent hover:bg-gray-200 hover:text-black hover:scale-105"
            to={"/cart"}
          >
            Cart
          </NavLink>
          <NavLink
            className="block font-semibold text-2xl mb-2 transition-all duration-300 py-2 px-4 rounded-12 bg-transparent hover:bg-gray-200 hover:text-black hover:scale-105"
            to={"orders"}
          >
            Orderes
          </NavLink>
          <NavLink
            className="block font-semibold text-2xl mb-2 transition-all duration-300 py-2 px-4 rounded-12 bg-transparent hover:bg-gray-200 hover:text-black hover:scale-105"
            to={"ordered-products"}
          >
            Order history
          </NavLink>
        </div>
        <div className="w-[80%] min-h-screen px-10 ml-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default User;
