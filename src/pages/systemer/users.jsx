import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import MyTitle from "@/components/MyTitle";
import MyAddButton from "@/components/MyAddButton";
import MyAttentionText from "@/components/MyAttentionText";
import { DataRegister, DataEditor } from "@/functions/Data";
import { UserPassword } from "@/functions/Users";
import MyTable from "@/components/MyTable";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";
import adminMenuLists from "@/jsons/adminMenuLists";

const Users = () => {
  const title = adminMenuLists[5]?.name;
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
      name: "lastname",
      desc: "Овог",
      table: true,
    },
    {
      name: "firstname",
      desc: "Нэр",
      table: true,
    },
    {
      name: "email",
      desc: "Имэйл",
      table: true,
    },
    {
      name: "phone",
      desc: "Утас",
      table: true,
    },
    {
      name: "permission",
      desc: "Эрх",
      table: true,
      select: [
        {
          _id: 0,
          name: "Сонгоно уу...",
          desc: "Сонгоно уу...",
        },
      ],
    },
    {
      name: "status",
      desc: "Төлөв",
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
      .get("/api/users")
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
    } else if (operation && operation === "detail" && data) {
      setAction({
        ...action,
        operation,
        data,
        isModal: true,
      });
    } else if (operation && operation === "edit" && data) {
      setEditData(data);
      setAction({
        ...action,
        operation,
        isModal: true,
      });
    } else if (operation && operation === "password" && data) {
      setEditData(data);
      setAction({
        ...action,
        operation,
        isModal: true,
      });
    } else if (operation && operation === "link" && data) {
      setEditData(data);
      setAction({
        ...action,
        operation,
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
      DataRegister(adminMenuLists[5]?.link, newData);
      setNewData();
    } else if (action.operation === "edit") {
      DataEditor(adminMenuLists[5]?.link, editData);
      setEditData();
    } else if (action.operation === "password") {
      UserPassword(adminMenuLists[5]?.link, {
        email: editData.email,
        newpassword: editData.newpassword,
        confirmpassword: editData.confirmpassword,
      });
      setEditData();
    } else if (action.operation === "link") {
      DataEditor(adminMenuLists[5]?.link, editData);
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
    } else if (
      action.operation === "edit" ||
      action.operation === "password" ||
      action.operation === "link"
    ) {
      setEditData({
        ...editData,
        [event.target.name]: event.target.value,
      });
    }
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
            handleChangeValue={handleChangeValue}
            newData={newData}
            editData={editData}
            options={allDatas?.permissions}
            systems={allDatas?.systems}
            enterprises={allDatas?.enterprises}
          />
        )}
        <div className="mt-12">
          <MyAddButton toggleModal={toggleModal} />
          {loading ? (
            <Spinner />
          ) : allDatas?.users?.length > 0 ? (
            <MyTable
              metadatas={metadatas}
              allDatas={allDatas?.users}
              toggleModal={toggleModal}
              action="user"
              permissions={allDatas?.permissions}
            />
          ) : (
            <MyAttentionText text="Өгөгдөл олдсонгүй." action="error" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
