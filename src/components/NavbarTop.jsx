import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
// import Link from "next/link";

const NavbarTop = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [allDatas, setAllDatas] = useState();
  const [loading, setLoading] = useState(false);
  const metadatas = [
    {
      name: "name",
      desc: "Цэсний нэр",
      width: "20%",
    },
    {
      name: "link",
      desc: "Цэсний холболт",
      width: "60%",
    },
  ];

  const getDatas = () => {
    axios
      .get("/api/menus")
      .then((result) => {
        if (result.status === 200) {
          setAllDatas(result.data.datas);
        } else {
          alert("Өгөгдлийг татахад алдаа гарлаа. Дахин оролдоно уу");
        }
      })
      .catch((error) => {
        alert("Өгөгдлийг татахад алдаа гарлаа. Дахин оролдоно уу");
      });
  };

  useEffect(() => {
    setLoading(true);
    getDatas();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (link) => {
    alert(link);
  };

  return (
    <nav className="bg-blue-300 md:py-4">
      <div className="flex md:flex-row flex-col md:items-center font-medium justify-around">
        <div className="z-50 p-2 md:w-auto w-full flex justify-between items-center">
          <p className="md:cursor-pointer text-center text-white text-[1.5rem]">
            ЛОГО
          </p>
          <div
            className="text-2xl flex items-center md:hidden text-white"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <ion-icon name={`${openMenu ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul
          className={`md:flex md:flex-row gap-2 duration-500 md:block ${
            openMenu ? "block" : "hidden"
          }`}
        >
          {loading ? (
            <Spinner />
          ) : (
            allDatas
              ?.filter((d) => d.parent === undefined || d.parent === "")
              ?.map((data, index) => {
                return (
                  <li
                    key={index}
                    className="my-3 md:my-0 group"
                    onClick={() => handleClick(data.link)}
                  >
                    <p className="md:w-auto w-[90%] mx-auto px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-200 hover:text-blue-400 duration-300 cursor-pointer">
                      {data.name}
                    </p>
                    {allDatas?.filter((d) => d.parent === data._id)?.length >
                      0 && (
                      <div className="ml-2">
                        <div className="absolute top-15 hidden group-hover:block hover:block">
                          {/* Дээшээ харсан сум */}
                          <div className="py-3">
                            <div className="w-4 h-4 left-5 absolute mt-1 bg-white rotate-45"></div>
                          </div>
                          {/* Дэд цэс */}
                          <div className="bg-white px-4 py-1.5 rounded-lg w-auto grid grid-cols-2 gap-x-12 gap-y-4">
                            <ul className="ml-3 text-sm my-2" key={index}>
                              {allDatas
                                ?.filter((d) => d.parent === data._id)
                                ?.map((submenu, index) => {
                                  return (
                                    <li
                                      key={index}
                                      className="my-1 hover:text-blue-500 cursor-pointer"
                                    >
                                      {submenu.name}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarTop;
