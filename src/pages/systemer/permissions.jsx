import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import MyTitle from "@/components/MyTitle";
import MyAttentionText from "@/components/MyAttentionText";
import MyTable from "@/components/MyTable";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";
import adminMenuLists from "@/jsons/adminMenuLists";

const Permissions = () => {
  const title = adminMenuLists[2]?.name;
  const [allDatas, setAllDatas] = useState();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState({
    operation: null,
    isModal: false,
    menu: title,
  });
  const metadatas = [
    {
      name: "name",
      desc: "Эрхийн код",
      table: true,
    },
    {
      name: "desc",
      desc: "Эрхийн тайлбар",
      table: true,
    },
  ];

  useEffect(() => {
    setLoading(true);

    axios
      .get("/api/permissions")
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

    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleModal = (event, operation = null, data = null) => {
    if (operation && operation === "add") {
      setAction({
        ...action,
        operation,
        isModal: true,
      });
    } else if (operation && data) {
      setAction({
        ...action,
        operation,
        data,
        isModal: true,
      });
    }
  };

  const handleDecline = () => {
    setAction({
      ...action,
      operation: null,
      isModal: false,
      menu: title,
    });
  };

  const handleAccept = () => {
    setAction({
      ...action,
      operation: null,
      isModal: false,
      menu: title,
    });
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <Sidebar />
      <div className="w-[85%] h-screen py-8 px-10">
        <MyTitle title={title} />
        {action.isModal && (
          <Modal
            title={title}
            action={action}
            metadatas={metadatas}
            handleDecline={handleDecline}
            handleAccept={handleAccept}
          />
        )}
        <div className="mt-12">
          {loading ? (
            <Spinner />
          ) : allDatas?.length > 0 ? (
            <MyTable
              metadatas={metadatas}
              allDatas={allDatas}
              toggleModal={toggleModal}
              action="none"
            />
          ) : (
            <MyAttentionText text="Өгөгдөл олдсонгүй." action="error" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Permissions;
