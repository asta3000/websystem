import React from "react";

const MyInput = (props) => {
  return (
    <div className="py-2">
      <label className="text-sm text-gray-800 block">{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        value={
          props.value !== null && props.value !== undefined ? props.value : ""
        }
        readonly={props.readonly}
        className="border-b border-b-1 border-b-gray-400 w-full py-1 px-1 text-sm outline-none active:outline-none"
        onChange={props.handleChangeValue}
        // onClick={props.onClick}
      />
    </div>
  );
};

export default MyInput;
