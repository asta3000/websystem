import axios from "axios";

export const DataRegister = async (url, data) => {
  await axios
    .post("/api" + url, data)
    .then((result) => {
      if (result.status === 200) {
        alert("Амжилттай бүртгэгдлээ.");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Оруулсан мэдээлэл алдаатай байна. Дахин оролдоно уу");
      return false;
    });
};

export const DataEditor = async (url, data) => {
  await axios
    .put("/api" + url, data)
    .then((result) => {
      if (result.status === 200) {
        alert("Амжилттай өөрчлөгдлөө.");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Оруулсан мэдээлэл алдаатай байна. Дахин оролдоно уу");
      return false;
    });
};
