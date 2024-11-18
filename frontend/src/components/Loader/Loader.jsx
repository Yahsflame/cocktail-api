import React from "react";

const Loader = ({ progress }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-20 h-20"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className="stroke-gray-600 stroke-[6]"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className="stroke-white stroke-[6] transition-all duration-500 ease-out"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference - (progress / 100) * circumference,
          }}
        />
      </svg>
    </div>
  );
};

export default Loader;
