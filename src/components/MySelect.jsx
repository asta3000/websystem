import React from "react";

const MySelect = (props) => {
  // console.log(props);
  return (
    <div className="py-2">
      <label className="text-sm text-gray-800 block">{props.label}</label>
      <select
        name={props.name}
        className="border-b border-b-1 border-b-gray-400 w-full py-1 px-1 text-sm outline-none active:outline-none"
        onChange={props.handleChangeValue}
      >
        {props.name === "system" ||
        props.name === "enterprise" ||
        props.name === "submenu" ? (
          <option value={0} className="text-sm">
            Сонгоно уу...
          </option>
        ) : null}
        {props.options?.map((option, index) => {
          if (props.name === "submenu") {
            console.log(option);
          }
          return props.name === "status" ||
            props.name === "comment" ||
            props.name === "type" ? (
            props.value === index ? (
              <option
                value={option.id}
                key={index}
                className="text-sm"
                selected
              >
                {option.desc}
              </option>
            ) : (
              <option value={option.id} key={index} className="text-sm">
                {option.desc}
              </option>
            )
          ) : props.name === "permission" ? (
            option._id === props.value ? (
              <option
                value={option._id}
                key={index}
                className="text-sm"
                selected
              >
                {option.desc}
              </option>
            ) : (
              <option value={option._id} key={index} className="text-sm">
                {option.desc}
              </option>
            )
          ) : props.name === "system" ||
            props.name === "enterprise" ||
            props.name === "parent" ? (
            option._id === props.value ? (
              <option
                value={option._id}
                key={index}
                className="text-sm"
                selected
              >
                {option.name}
              </option>
            ) : (
              <option value={option._id} key={index} className="text-sm">
                {option.name}
              </option>
            )
          ) : props.name === "mainmenu" && option.parent === undefined ? (
            option._id === props.value ? (
              <option
                value={option._id}
                key={index}
                className="text-sm"
                selected
              >
                {option.name}
              </option>
            ) : (
              <option value={option._id} key={index} className="text-sm">
                {option.name}
              </option>
            )
          ) : props.name === "submenu" &&
            // Үндсэн цэсийг сонгосон үед ажиллана.
            option.parent === props.newData?.mainmenu ? (
            option._id === props.value ? (
              <option
                value={option._id}
                key={index}
                className="text-sm"
                selected
              >
                {option.name}
              </option>
            ) : (
              <option value={option._id} key={index} className="text-sm">
                {option.name}
              </option>
            )
          ) : null;
        })}
      </select>
    </div>
  );
};

export default MySelect;
