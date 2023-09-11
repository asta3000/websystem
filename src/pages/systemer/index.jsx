import React from "react";
import Sidebar from "@/components/Sidebar";
import MyTitle from "@/components/MyTitle";

const Systemer = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <Sidebar />
      <div className="w-[85%] h-screen py-8 px-10">
        <MyTitle title="Үзүүлэлт" />
      </div>
    </div>
  );
};

export default Systemer;
