import React from "react";

const MyTitle = (props) => {
  return (
    <h2 className="text-xl font-normal text-blue-400 uppercase border-b border-b-1 border-b-gray-300 pb-3">
      {props.title}
    </h2>
  );
};

export default MyTitle;
