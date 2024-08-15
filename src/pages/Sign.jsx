import React from "react";
import AuthCard from "../components/sign/SignUp";

const Sign = ({ setShow }) => {
  return (
    <div className="mt-[150px]">
      <AuthCard setShow={setShow} />
    </div>
  );
};

export default Sign;
