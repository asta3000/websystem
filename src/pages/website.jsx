import React from "react";
import NavbarTop from "@/components/NavbarTop";

const Home = () => {
  return (
    <div className="w-full h-screen bg-green-200">
      <div className="w-full fixed top-0 left-0">
        <NavbarTop />
      </div>
    </div>
  );
};

export default Home;
