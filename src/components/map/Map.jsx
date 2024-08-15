import React, { useState, useEffect, useRef } from "react";

const Map = ({ setIsSticky, closeModal }) => {
  const [selectedPlace, setSelectedPlace] = useState({
    lat: 41.289432,
    lng: 69.179664,
    name: "A. Ikromov Park",
  });

  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      // Initial map setup
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: selectedPlace.lat, lng: selectedPlace.lng },
        zoom: 15,
      });

      // Initial marker setup
      markerRef.current = new window.google.maps.Marker({
        position: { lat: selectedPlace.lat, lng: selectedPlace.lng },
        map: googleMapRef.current,
        title: selectedPlace.name,
      });

      // Add click event listener to map
      googleMapRef.current.addListener("click", (event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();

        setSelectedPlace({
          lat: newLat,
          lng: newLng,
          name: `Selected Location (${newLat.toFixed(6)}, ${newLng.toFixed(
            6
          )})`,
        });

        // Move marker to new location
        markerRef.current.setPosition({ lat: newLat, lng: newLng });
        googleMapRef.current.panTo({ lat: newLat, lng: newLng });
      });
    } else {
      console.error("Google Maps JavaScript API not loaded.");
    }
  }, []); // Empty dependency array, so this effect runs only once

  return (
    <div
      onClick={closeModal}
      className="fixed w-full h-full flex justify-center items-center top-0 right-0 bg-black z-[35] bg-opacity-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[750px] h-[500px] bg-white rounded-xl p-4 flex flex-col justify-center items-center relative"
      >
        <div
          ref={mapRef}
          style={{ width: "600px", height: "450px", borderRadius: "8px" }}
        ></div>
        {selectedPlace && (
          <div className="mt-4 text-center">
            <h2>Selected Location:</h2>
            <p>Latitude: {selectedPlace.lat.toFixed(6)}</p>
            <p>Longitude: {selectedPlace.lng.toFixed(6)}</p>
            <p>Location Name: {selectedPlace.name}</p>
          </div>
        )}
        <button
          className="border px-10 py-2 rounded-md font-bold text-white bg-blue-800"
          onClick={() => setIsSticky(false)}
        >
          Belgilash
        </button>
      </div>
    </div>
  );
};

export default Map;
