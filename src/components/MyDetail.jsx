import React from "react";
import MyValue from "./MyValue";

const MyDetail = (props) => {
  return (
    <div className="text-sm">
      <p className="font-semibold">{props.metadata.desc}</p>
      <p className="ml-3 mt-2">
        <MyValue
          value={props.value}
          metadata={props.metadata}
          permissions={props.permissions}
        />
      </p>
    </div>
  );
};

export default MyDetail;
