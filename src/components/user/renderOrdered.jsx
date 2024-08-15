import React from "react";
import { MdDeleteSweep } from "react-icons/md";

export const RenderOrdered = () => {
  return (
    <>
      <div className="font-medium text-5xl mt-5">
        <div className="border-4 mt-5 py-3 flex pr-5 items-center justify-between rounded-20">
          <div className="flex items-center gap-16">
            <img
              className="w-[200px] h-auto"
              src="https://cp.ectn.uz/files//freshburger_kur_wb.png"
              alt="food"
            />
            <h4 className="text-3xl max-w-[360px]">Burger</h4>
          </div>
          <div className="text-right">
            <button>
              <MdDeleteSweep className="w-[40px] mx-auto hover:text-blue-600 h-auto text-blue-700" />
              <button className="font-medium text-xl py-2 px-4 rounded-12 bg-transparent hover:bg-gray-200 transition-all duration-300">
                Order now
              </button>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenderOrdered;
