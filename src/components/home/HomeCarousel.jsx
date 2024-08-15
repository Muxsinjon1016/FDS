import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Burger from "/logo/Burger.webp";
import Burger1 from "/logo/burger1.avif";
import Burger2 from "/logo/twoBurger.jpg";
import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const HomeCarousel = () => {
  const images = [Burger, Burger1, Burger2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setDirection("left");
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden md:mt-0 sm:-mt-10 -mt-20">
    <div
      className={`relative flex transition-transform duration-700 ease-in-out`}
      style={{
        transform: `translateX(-${currentIndex * 33.333333333}%)`,
        width: `${images.length * 100}%`,
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className="w-full max-h-[500px] rounded-2xl overflow-hidden object-cover"
        />
      ))}
    </div>
    <div className="absolute inset-y-0 left-2 flex items-center">
      <button
        onClick={goToPrevious}
        className="bg-white md:p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity duration-300"
      >
        <IoIosArrowBack className="text-4xl text-black" />
      </button>
    </div>
    <div className="absolute inset-y-0 right-2 flex items-center">
      <button
        onClick={goToNext}
        className="bg-white md:p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity duration-300"
      >
        <MdNavigateNext className="text-4xl text-black" />
      </button>
    </div>
  </div>
  
  );
};

export default HomeCarousel;
