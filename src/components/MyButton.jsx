import React from "react";

const MyButton = (props) => {
  return (
    <button
      onClick={(event) => props.onClick(event)}
      className={`${
        props.action === "accept"
          ? "bg-green-300 text-green-700 hover:bg-green-600 hover:text-white"
          : props.action === "decline"
          ? "bg-red-200 text-red-700 hover:border-0 hover:bg-red-500 hover:text-white"
          : props.action === "inactive"
          ? "border border-1 border-gray-400 text-gray-400 cursor-default"
          : null
      } py-1.5 px-3 rounded-md duration-300 mr-3 text-sm`}
    >
      {props.title}
    </button>
  );
};

export default MyButton;
