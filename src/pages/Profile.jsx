import React from "react";

const Profile = () => {
  return (
    <>
      <div className="container mt-[150px]">
        <div className="flex items-center justify-between">
          <img
            className="w-[200px] h-[200px]"
            src="/public/logo/foodLogo.png"
            alt="user image"
          />
          <div className="w-[75%]">
            <h2 className="bg-gray-200 py-3 px-7 rounded-12 mb-2 text-2xl font-bold w-[100%]">
              Name: fullname
            </h2>
            <p className="bg-gray-200 py-3 px-7 rounded-12 mb-2 text-xl font-medium w-[100%]">
              Email: email
            </p>
            <p className="bg-gray-200 py-3 px-7 rounded-12 mb-2 text-xl font-medium w-[100%]">
              Address: address
            </p>
            <p className="bg-gray-200 py-3 px-7 rounded-12 mb-2 text-xl font-medium w-[100%]">
              Entered: createdAt
            </p>
            <div className="mt-5 flex items-center justify-between flex-wrap">
              <button className="rounded-12 hover:bg-blue-600 bg-blue-700 text-white font-semibold text-2xl py-3 px-10  block w-[49%]">
                Update
              </button>
              <button className="rounded-12 hover:bg-red-500 bg-red-600 text-white font-semibold text-2xl py-3 px-10  block w-[49%]">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
