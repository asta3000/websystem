import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserPassword } from "@/functions/Users";
import Modal from "@/components/Modal";
import adminMenuLists from "@/jsons/adminMenuLists.json";

const Sidebar = () => {
  const router = useRouter();
  const [editData, setEditData] = useState({});
  const [action, setAction] = useState({
    operation: null,
    isModal: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(window.location.origin + "/loginer");
    }

    if (localStorage.getItem("email")) {
      setEditData({
        ...editData,
        email: localStorage.getItem("email"),
      });
    }

    if (localStorage.getItem("name")) {
      setEditData({
        ...editData,
        user: localStorage.getItem("name"),
      });
    }
  }, []);

  const toggleModal = (event, operation = null, data = null) => {
    if (operation === "password") {
      // setEditData(data);
      setAction({
        ...action,
        operation,
        isModal: true,
      });
    }
  };

  const handleMenuClick = (data) => {
    // Тухайн цэсэнд орсон байгаа эсэхийг шалгах
    if (window.location.href?.includes(data.link) && data.link !== "/") {
      // console.log(window?.location.href);
    } else {
      // Админ эрхтэй бол админ хуудсанд шилжих, үгүй бол хэрэглэгчийн хуудсанд шилжих
      if (localStorage.getItem("permission") === "647634fc503a408d9812657b") {
        router.push({
          pathname: window.location.origin + "/systemer" + data.link,
        });
      } else {
        router.push(window.location.origin);
      }
    }
  };

  const handleSignOut = () => {
    const result = confirm("Системээс гарахад итгэлтэй байна уу?");
    if (result) {
      localStorage.clear();
      router.push("/loginer");
    }
  };

  const handleDecline = () => {
    setAction({
      ...action,
      operation: null,
      isModal: false,
    });
  };

  const handleChangeValue = (event) => {
    if (action.operation === "password") {
      setEditData({
        ...editData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleAccept = () => {
    if (action.operation === "password") {
      UserPassword(adminMenuLists[5]?.link, {
        email: editData.email,
        newpassword: editData.newpassword,
        confirmpassword: editData.confirmpassword,
      });
      setEditData();
    }

    setAction({
      ...action,
      operation: null,
      isModal: false,
    });
  };

  return (
    <div className="w-[15%] min-w-[250px] h-screen bg-yellow-500 flex flex-col justify-between items-center">
      <div className="my-4 p-3 w-[90%]">
        <h1 className="text-center font-bold text-4xl mb-10 text-white">
          LOGO
        </h1>
        <ul>
          {adminMenuLists
            ?.filter((m) => m.status === true)
            ?.map((menuList, index) => {
              return (
                <li
                  key={index}
                  className="pl-4 py-2 my-2 text-sm rounded-lg text-white font-medium hover:bg-white hover:text-yellow-600 hover:pl-8 duration-500 cursor-pointer"
                  onClick={() => handleMenuClick(menuList)}
                >
                  {menuList.name}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="w-[90%]">
        <div className="mt-4 mb-1 p-2 w-full bg-white hover:text-yellow-600 cursor-default rounded-2xl">
          <p className="text-center text-sm font-medium">
            {editData.user?.toUpperCase()}
          </p>
        </div>
        {action.isModal && (
          <Modal
            title="Өөрийн нууц үг солих"
            action={action}
            handleDecline={handleDecline}
            handleAccept={handleAccept}
            handleChangeValue={handleChangeValue}
            editData={editData}
          />
        )}
        <div
          className="my-1 p-2 w-full bg-white hover:text-yellow-600 cursor-pointer rounded-2xl"
          onClick={(event) => toggleModal(event, "password")}
        >
          <p className="text-center text-sm font-medium">
            Өөрийн нууц үг солих
          </p>
        </div>
        <div
          className="mb-4 mt-1 p-2 w-full bg-white hover:text-yellow-600 cursor-pointer rounded-2xl"
          onClick={handleSignOut}
        >
          <p className="text-center text-sm font-medium">Гарах</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
