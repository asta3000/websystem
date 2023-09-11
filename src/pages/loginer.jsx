import React, { useState } from "react";
import { useRouter } from "next/router";
import MyButton from "@/components/MyButton";
import MyInput from "@/components/MyInput";
import { UserLogin } from "@/functions/Users";
import Spinner from "@/components/Spinner";

const LoginCover = new URL("../images/loginCover.jpg", import.meta.url);

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const router = useRouter();

  const handleChangeValue = (event) => {
    event.preventDefault();

    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClearData = (event) => {
    event.preventDefault();
    setUserData({});
  };

  const handleAcceptData = async (event) => {
    event.preventDefault();
    if (userData.email && userData.password) {
      setLoading(true);
      await UserLogin({
        email: userData.email,
        password: userData.password,
      });

      if (localStorage.getItem("permission") === "647634fc503a408d9812657b") {
        router.push("/systemer/");
      } else {
        router.push("/");
      }

      setLoading(false);
    } else {
      alert("Оруулсан мэдээлэл алдаатай байна. Дахин оролдоно уу");
    }
  };

  return (
    <div className="flex flex-row justify-center items-center overflow-hidden">
      <div className="w-[25%] h-screen bg-yellow-500 flex flex-col justify-center items-center">
        {/* Start of Login Form */}
        <div className="w-[70%] rounded-t-lg p-5 bg-white font-semibold text-lg">
          Нэвтрэх хэсэг
        </div>
        <form className="w-[70%] p-3 px-5 bg-white rounded-b-lg">
          <div>
            <MyInput
              type="email"
              name="email"
              label="Имэйл хаяг"
              value={userData.email}
              handleChangeValue={handleChangeValue}
            />
            <MyInput
              type="password"
              name="password"
              label="Нууц үг"
              value={userData.password}
              handleChangeValue={handleChangeValue}
            />
          </div>

          <div className="pt-5 pb-3">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <MyButton
                  title="Нэвтрэх"
                  action="accept"
                  onClick={handleAcceptData}
                />
                <MyButton
                  title="Цэвэрлэх"
                  action="decline"
                  onClick={handleClearData}
                />
              </>
            )}
          </div>
        </form>
        {/* End of Login Form */}
      </div>
      <div className="w-[75%] h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center">
        <img src={LoginCover} alt={null} />
      </div>
    </div>
  );
};

export default Login;
