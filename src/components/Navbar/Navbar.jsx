import React, { useState, useRef } from "react";
import Logo from "../../../public/logo/foodLogo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { IoSearchOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import Sign from "../../pages/Sign";
import { useSelector, useDispatch } from "react-redux";
import Map from "../map/Map";
import axios from "axios";
import { IoSettingsSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import SlideBar from "./slideBar";
import SearchModal from "./searchModal";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.addTo);
  const navigate = useNavigate();
  const [slideBar, setSlideBar] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchTypeSelect = (type) => {
    setSearchType(type);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleSearch = async () => {
    const query = inputRef.current.value.trim().toLowerCase();
    if (!query) return;

    const url =
      searchType === "restaurants"
        ? `http://localhost:4000/api/restaurants?search=${query}`
        : `http://localhost:4000/api/foods?search=${query}`;

    try {
      const response = await axios.get(url);
      let results = response.data.data;

      results = results.filter((item) =>
        item.name.toLowerCase().includes(query)
      );

      setSearchResults(results);
      dispatch(setSearchResults(results));
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleSearchBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsSearchOpen(false);
      setSearchType("");
      setSearchResults([]);
    }
  };

  const handleResultClick = (result) => {
    if (searchType === "restaurants") {
      navigate(`/about/${result.id}`, { state: { restaurant: result } });
    } else if (searchType === "foods") {
      const restaurantId = result.restaurant_id;
      navigate(`/about/${restaurantId}`, { state: { selectedFood: result } });
    }
    setIsSearchOpen(false);
  };

  return (
    <div className="shadow-lg -py-10 fixed z-20 top-0 left-0 right-0 bg-white">
      <div className="md:hidden container">
        <div className="flex items-center justify-between">
          <NavLink to={"/"}>
            <img
              className="w-[50px] h-auto sm:w-[100px]"
              src={Logo}
              alt="logo"
            />
          </NavLink>
          <ul className="flex gap-3 sm:gap-7 items-center">
            <li className="text-xs sm:text-lg">
              <NavLink to="./">Home</NavLink>
            </li>
            <li className="text-xs sm:text-lg">
              <NavLink to="./menu">Menu</NavLink>
            </li>
            <li className="text-xs sm:text-lg">
              <NavLink to="./weAbout">About us</NavLink>
            </li>
          </ul>
          <IoSearchOutline
            onClick={() => setSearchModal(true)}
            className="font-bold h-auto w-[28px] p-1 bg-transparent hover:bg-gray-300 rounded-[100%]"
          />
          {searchModal && (
            <SearchModal searchModal={() => setSearchModal(false)} />
          )}
          <GiHamburgerMenu
            onClick={() => setSlideBar(true)}
            className="w-[32px] rounded-6 p-1 bg-transparent hover:bg-gray-200 h-auto"
          />
          {slideBar && <SlideBar slideBar={() => setSlideBar(false)} />}
        </div>
      </div>
      <div className="container hidden md:block lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <NavLink to="./">
              <img
                src={Logo}
                alt="site logo"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
              />
            </NavLink>
            <div className="ml-4">
              <ul className="flex flex-col md:flex-row gap-7 md:gap-6">
                <li className="text-lg">
                  <NavLink to="./">Home</NavLink>
                </li>
                <li className="text-lg">
                  <NavLink to="./menu">Menu</NavLink>
                </li>
                <li className="text-lg">
                  <NavLink to="./weAbout">We About</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-5 items-center mt-4 md:mt-0">
            <div>
              <IoSearchOutline
                onClick={() => setSearchModal(true)}
                className="font-bold h-auto w-[45px] p-3 bg-gray-200 rounded-[100%]"
              />
              <div className="absolute top-12 right-14 w-full">
                {searchModal && (
                  <SearchModal searchModal={() => setSearchModal(false)} />
                )}
              </div>
            </div>
            <Link
              to={"/cart"}
              className="bg-slate-200 relative flex justify-center items-center rounded-full p-3"
            >
              <SlBasket className="w-5 h-5 text-blue-950 cursor-pointer" />
              <span className="absolute top-1 right-1 p-1 w-4 h-4 text-[10px] bg-blue-950 flex justify-center items-center text-white rounded-full">
                {list.length}
              </span>
            </Link>
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
        {show && <Sign setShow={setShow} />}
        {isSticky && (
          <Map closeModal={() => setShow(false)} setIsSticky={setIsSticky} />
        )}
      </div>
      <div className="container hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <NavLink to="./">
              <img
                src={Logo}
                alt="site logo"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
              />
            </NavLink>
            <div className="ml-4">
              <ul className="flex flex-col md:flex-row gap-7 md:gap-6">
                <li className="text-lg">
                  <NavLink to="./">Home</NavLink>
                </li>
                <li className="text-lg">
                  <NavLink to="./menu">Menu</NavLink>
                </li>
                <li className="text-lg">
                  <NavLink to="./weAbout">We About</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-5 items-center mt-4 md:mt-0">
            <div className="relative" onBlur={handleSearchBlur}>
              <div
                className={`bg-slate-200 flex items-center rounded-full p-3 transition-all duration-300 cursor-pointer ${
                  isSearchOpen && searchType
                    ? "lg:w-[520px]"
                    : "md:w-28 lg:w-44 xl:w-64"
                }`}
                onClick={handleSearchClick}
              >
                <IoSearchOutline className="w-5 h-5 text-blue-950" />
                {isSearchOpen && searchType ? (
                  <input
                    type="text"
                    ref={inputRef}
                    className="bg-transparent outline-none ml-2 w-full transition-all duration-300"
                    placeholder={`Search ${searchType}`}
                    onChange={handleSearch}
                    autoFocus
                  />
                ) : (
                  isSearchOpen &&
                  !searchType && (
                    <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg w-full p-2 z-10">
                      <button
                        className="block w-full text-left px-4 py-2 rounded-12 hover:bg-gray-200"
                        onClick={() => handleSearchTypeSelect("restaurants")}
                      >
                        Search Restaurants
                      </button>
                      <button
                        className="block w-full text-left px-4 rounded-12 py-2 hover:bg-gray-200"
                        onClick={() => handleSearchTypeSelect("foods")}
                      >
                        Search Foods
                      </button>
                    </div>
                  )
                )}
              </div>
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-full max-h-64 overflow-y-auto z-10">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleResultClick(result)}
                    >
                      {result.name} - {result.description || ""}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/cart"
              className="bg-slate-200 relative flex justify-center items-center rounded-full p-3"
            >
              <SlBasket className="w-5 h-5 text-blue-950 cursor-pointer" />
              <span className="absolute top-1 right-1 p-1 w-4 h-4 text-[10px] bg-blue-950 flex justify-center items-center text-white rounded-full">
                {list.length}
              </span>
            </Link>
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
            <div
              onClick={() => navigate("user-profile")}
              className="bg-slate-200 flex justify-center items-center rounded-full p-3"
            >
              <IoSettingsSharp className="w-5 h-5 text-blue-950 cursor-pointer" />
            </div>
          </div>
        </div>
        {show && <Sign setShow={setShow} />}
        {isSticky && (
          <Map
            closeModal={() => setIsSticky(false)}
            setIsSticky={setIsSticky}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
