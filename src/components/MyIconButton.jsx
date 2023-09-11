import React from "react";
import { BsPencilSquare, BsEye, BsKey } from "react-icons/bs";
import { BiLink } from "react-icons/bi";

const MyIconButton = (props) => {
  return (
    <div onClick={(event) => props.onClick(event)}>
      {props.action === "edit" ? (
        <BsPencilSquare
          className="my-1.5 text-black cursor-pointer"
          size={16}
          onClick={(event) => props.onClick(event, "edit", props.data)}
        />
      ) : props.action === "detail" ? (
        <BsEye
          className="my-1.5 text-black cursor-pointer"
          size={16}
          onClick={(event) => props.onClick(event, "detail", props.data)}
        />
      ) : props.action === "password" ? (
        <BsKey
          className="my-1.5 text-black cursor-pointer"
          size={16}
          onClick={(event) => props.onClick(event, "password", props.data)}
        />
      ) : props.action === "link" ? (
        <BiLink
          className="my-1.5 text-black cursor-pointer"
          size={16}
          onClick={(event) => props.onClick(event, "link", props.data)}
        />
      ) : null}
    </div>
  );
};

export default MyIconButton;
