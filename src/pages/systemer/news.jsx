import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import MyTitle from "@/components/MyTitle";
import MyAddButton from "@/components/MyAddButton";
import MyAttentionText from "@/components/MyAttentionText";
import MyTable from "@/components/MyTable";
import Spinner from "@/components/Spinner";
import { DataRegister, DataEditor } from "@/functions/Data";
import Modal from "@/components/Modal";
import adminMenuLists from "@/jsons/adminMenuLists";

const News = () => {
  const title = adminMenuLists[7]?.name;
  const [allDatas, setAllDatas] = useState();
  const [newData, setNewData] = useState();
  const [editData, setEditData] = useState();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState({
    operation: null,
    isModal: false,
    menu: title,
  });
  const metadatas = [
    {
      name: "mainmenu",
      desc: "Үндсэн цэс",
      width: "15%",
      table: true,
      select: [
        {
          id: 0,
          name: "Сонгоно уу...",
          desc: "Сонгоно уу...",
        },
      ],
    },
    {
      name: "submenu",
      desc: "Дэд цэс",
      width: "15%",
      table: true,
      select: [
        {
          id: 0,
          name: "Сонгоно уу...",
          desc: "Сонгоно уу...",
        },
      ],
    },
    {
      name: "title",
      desc: "Мэдээний нэр",
      width: "15%",
      table: true,
    },
    {
      name: "type",
      desc: "Мэдээний төрөл",
      width: "15%",
      table: true,
      select: [
        {
          id: 0,
          name: "Сонгоно уу...",
          desc: "Сонгоно уу...",
        },
        {
          id: 1,
          name: "Текстэн мэдээ",
          desc: "Текстэн мэдээ",
        },
        {
          id: 2,
          name: "Онцгой мэдээ",
          desc: "Онцгой мэдээ",
        },
        {
          id: 3,
          name: "Холбоос мэдээ",
          desc: "Холбоос мэдээ",
        },
      ],
    },
    {
      name: "content",
      desc: "Агуулга",
      width: "15%",
      table: false,
    },
    {
      name: "image",
      desc: "Зураг",
      type: "file",
      width: "15%",
      table: false,
    },
    {
      name: "file",
      desc: "Файл",
      type: "file",
      width: "15%",
      table: false,
    },
    {
      name: "link",
      desc: "Холбоос",
      width: "15%",
      table: false,
    },
    {
      name: "comment",
      desc: "Коммент",
      width: "15%",
      table: true,
      select: [
        {
          id: 0,
          name: "Сонгоно уу...",
          desc: "Сонгоно уу...",
        },
        {
          id: 1,
          name: "Идэвхтэй",
          desc: "Идэвхтэй",
        },
        {
          id: 2,
          name: "Идэвхгүй",
          desc: "Идэвхгүй",
        },
      ],
    },
    {
      name: "status",
      desc: "Төлөв",
      width: "10%",
      table: true,
      select: [
        {
          id: 0,
          name: "Сонгоно уу...",
          desc: "Сонгоно уу...",
        },
        {
          id: 1,
          name: "Идэвхтэй",
          desc: "Идэвхтэй",
        },
        {
          id: 2,
          name: "Идэвхгүй",
          desc: "Идэвхгүй",
        },
      ],
    },
  ];

  const getDatas = () => {
    axios
      .get("/api/news")
      .then((result) => {
        if (result.status === 200) {
          setAllDatas(result.data);
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
  }, [action]);

  const toggleModal = (event, operation = null, data = null) => {
    if (operation && operation === "add") {
      setAction({
        ...action,
        operation,
        isModal: true,
      });
    } else if (operation && operation === "edit" && data) {
      setAction({
        ...action,
        operation,
        isModal: true,
      });
      setEditData(data);
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
    if (action.operation === "add") {
      DataRegister(adminMenuLists[7]?.link, newData);
      setNewData();
    } else if (action.operation === "edit") {
      DataEditor(adminMenuLists[7]?.link, editData);
      setEditData();
    }

    setAction({
      ...action,
      operation: null,
      isModal: false,
      menu: title,
    });
  };

  const handleChangeValue = (event) => {
    if (action.operation === "add") {
      setNewData({
        ...newData,
        [event.target.name]: event.target.value,
      });
    } else if (action.operation === "edit") {
      setEditData({
        ...editData,
        [event.target.name]: event.target.value,
      });
    }
  };

  console.log("NEW_DATA: ", newData);

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
            handleChangeValue={handleChangeValue}
            options={allDatas.menus}
            newData={newData}
            editData={editData}
          />
        )}
        <div className="mt-12">
          <MyAddButton toggleModal={toggleModal} />
          {loading ? (
            <Spinner />
          ) : allDatas?.length > 0 ? (
            <MyTable
              metadatas={metadatas}
              allDatas={allDatas}
              action="default"
              toggleModal={toggleModal}
            />
          ) : (
            <MyAttentionText text="Өгөгдөл олдсонгүй." action="error" />
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
