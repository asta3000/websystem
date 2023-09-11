import React from "react";

const MyValue = (props) => {
  const metadata = props.metadata;
  let value = props.value;
  return (
    <div>
      {metadata.name === "c_date" ||
      metadata.name === "start_date" ||
      metadata.name === "end_date"
        ? value?.slice(0, 10)
        : metadata.name === "status"
        ? metadata.select[value]?.name
        : metadata.name === "permission"
        ? props.permissions !== undefined &&
          props.permissions?.filter((p) => p._id === value)[0]?.desc
        : metadata.name === "parent"
        ? props.allDatas?.filter((d) => d._id === value)[0]?.name
        : value}
    </div>
  );
};

export default MyValue;
