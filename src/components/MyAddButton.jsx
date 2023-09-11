import React from "react";
import { GoPlus } from "react-icons/go";

const MyAddButton = (props) => {
  return (
    <div
      className="border border-2 border-blue-400 text-blue-400 rounded-full p-1.5 inline-flex cursor-pointer hover:text-white hover:bg-blue-400 transition duration-700 mb-2"
      onClick={(event) => props.toggleModal(event, "add")}
    >
      <GoPlus size={15} />
    </div>
  );
};

export default MyAddButton;
