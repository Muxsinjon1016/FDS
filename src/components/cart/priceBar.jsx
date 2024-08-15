import React from "react";

export const PriceBar = ({ totalPrice }) => {
  return (
    <>
      <div>
        <p>{totalPrice}</p>
      </div>
    </>
  );
};

export default PriceBar;
