import connection from "@/libs/db";
import Enterprises from "../../models/all_enterprises";

export default async function (req, res) {
  await connection();

  if (req.method === "POST") {
    // Доорх мэдээлэл байвал шинэ бүртгэл гэж үзэх
    if (
      req.body.name &&
      req.body.register &&
      req.body.phone &&
      req.body.email &&
      req.body.status
    ) {
      // Регистрийн дугаар давхцаж байгаа эсэхийг шалгах
      await Enterprises.find({ register: req.body.register })
        .then(async (result) => {
          if (result === null || result.length === 0) {
            // Регистрийн дугаар давхцаагүй бол бүртгэл үүсгэх
            await Enterprises.create({
              name: req.body.name,
              register: req.body.register,
              phone: req.body.phone,
              email: req.body.email,
              status: Number(req.body.status),
            })
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((error) => {
                console.log(error);
                res.status(400).end();
              });
          } else {
            // Регистрийн дугаар давхцвал алдаа өгөх
            res.status(400).end();
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).end();
        });
    } else {
      res.status(400).end();
    }
  } else if (req.method === "GET") {
    const datas = await Enterprises.find();

    if (!datas) {
      res.status(401).end();
    }

    res.status(200).json({
      datas,
    });
  } else if (req.method === "PUT") {
    if (
      req.body.name &&
      req.body.register &&
      req.body.phone &&
      req.body.email &&
      req.body.status
    ) {
      // Регистрийн дугаар давхцаж байгаа эсэхийг шалгах
      await Enterprises.find({ register: req.body.register })
        .then(async (result) => {
          if (result.length <= 1) {
            // Регистрийн дугаар давхцаагүй бол бүртгэл үүсгэх
            await Enterprises.findByIdAndUpdate(
              req.body._id,
              {
                name: req.body.name,
                register: req.body.register,
                phone: req.body.phone,
                email: req.body.email,
                register: req.body.register,
                status: Number(req.body.status),
              },
              {
                new: true,
                runValidators: true,
              }
            )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((error) => {
                console.log(error);
                res.status(400).end();
              });
          } else {
            // Регистрийн дугаар давхцвал алдаа өгөх
            res.status(400).end();
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).end();
        });
    } else {
      res.status(400).end();
    }
  }
}
