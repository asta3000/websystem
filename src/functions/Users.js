import axios from "axios";

export const UserLogin = async (data) => {
  await axios
    .post("/api/users", {
      email: data.email,
      password: data.password,
    })
    .then((result) => {
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("email", result.data.user.email);
        localStorage.setItem(
          "name",
          result.data.user.firstname + "." + result.data.user.lastname[0]
        );
        localStorage.setItem("user", result.data.user._id);
        localStorage.setItem("permission", result.data.user.permission);
        alert("Амжилттай баталгаажлаа. Нэвтэрч орно уу.");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log("LOGIN_ERROR: ", error);
      alert("Таныг баталгаажуулахад алдаа гарлаа. Дахин оролдоно уу");
      return false;
    });
};

export const UserPassword = async (url, data) => {
  if (data.newpassword === data.confirmpassword) {
    await axios
      .post("/api" + url, {
        email: data.email,
        password: data.newpassword,
        action: "password",
      })
      .then((result) => {
        if (result.status === 200) {
          alert("Нууц үг амжилттай өөрчлөгдлөө.");
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log("REGISTER_ERROR: ", error);
        alert("Оруулсан мэдээлэл алдаатай байна. Дахин оролдоно уу");
        return false;
      });
  } else {
    alert("Оруулсан мэдээлэл алдаатай байна. Дахин оролдоно уу");
    return false;
  }
};
