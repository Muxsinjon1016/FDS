import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthCard = ({ setShow }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `${step === 1 ? "SignUp" : step === 2 ? "OTP" : "SignIn"} form data:`,
      formData
    );

    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setShow(false);
    }
  };

  return (
    <div
      onClick={() => setShow()}
      className="flex justify-center fixed top-0 right-0 bottom-0 w-full z-30 items-center h-full backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative p-4 sm:p-8 rounded-lg w-[70%] shadow-2xl border-4 border-gray-300 max-w-md"
      >
        <p
          onClick={() => setShow()}
          className="text-3xl cursor-pointer absolute top-4 right-7 font-bold"
        >
          x
        </p>
        <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-center">
          {step === 1 ? "Sign Up" : step === 2 ? "OTP Verification" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-1 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-1 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-1 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OTP Code
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="text-sm text-center text-gray-600 mt-2">
                We’ve sent a verification code to your email - someone@gmail.com
              </p>
            </div>
          )}
          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {step === 1 ? "Sign Up" : step === 2 ? "Submit" : "Sign In"}
          </button>
        </form>
        {step !== 2 && (
          <p className="text-sm text-center text-gray-600 mt-4">
            {step === 1 ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setStep(step === 1 ? 3 : 1)}
              className="text-blue-600 hover:underline"
            >
              {step === 1 ? "Sign In" : "Sign Up"}
            </button>
          </p>
        )}
        {step === 2 && (
          <p className="text-sm text-center text-gray-600 mt-4">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-blue-600 hover:underline"
            >
              Re-register
            </button>
          </p>
        )}
        <Link
          onClick={() => setShow()}
          className="py-2 px-4 text-white font-semibold bg-blue-700 rounded-6 hover:bg-blue-600 block text-center mt-5"
          to={"/user"}
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default AuthCard;
