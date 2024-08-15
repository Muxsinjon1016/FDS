import React, { useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export const SearchModal = ({ searchModal }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.addTo);
  const navigate = useNavigate();

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
    <>
      <div className="absolute top-14 right-10 bg-gray-200 rounded-12">
        <div
          className={`bg-slate-200 flex justify-center items-center rounded-full p-3 transition-all duration-300 cursor-pointer ${
            isSearchOpen && searchType ? "max-w-[280px]" : "w-64"
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
    </>
  );
};

export default SearchModal;
