import React from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen bg-green-200 flex justify-center items-center">
      <p>Index</p>
    </div>
  );
};

export default Home;
