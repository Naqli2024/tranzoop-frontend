import React from "react";
import { LuLoaderPinwheel } from "react-icons/lu";

const Loader = ({ isLoading }) => {
  if (!isLoading) {
    return null; 
  }

  return (
    <div className="spinner-loader">
        <LuLoaderPinwheel className="spinner-icon" />
    </div>
  );
};

export default Loader;