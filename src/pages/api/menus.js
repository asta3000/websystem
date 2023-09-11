import connection from "@/libs/db";
import Menus from "../../models/all_menus";

export default async function (req, res) {
  await connection();

  if (req.method === "POST") {
    // Доорх мэдээлэл байвал шинэ бүртгэл гэж үзэх
    if (req.body.name && req.body.link && req.body.status) {
      // Системийн нэр давхцаж байгаа эсэхийг шалгах
      await Menus.find({ name: req.body.name })
        .then(async (result) => {
          if (result === null || result.length === 0) {
            // Системийн нэр давхцаагүй бол бүртгэл үүсгэх
            console.log(req.body.parent);
            await Menus.create({
              parent: req.body.parent,
              name: req.body.name,
              link: req.body.link,
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
            // Системийн нэр давхцвал алдаа өгөх
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
    const datas = await Menus.find();

    if (!datas) {
      res.status(401).end();
    }

    res.status(200).json({
      datas,
    });
  } else if (req.method === "PUT") {
    if (req.body.name && req.body.link && req.body.status) {
      // Системий нэр давхцаж байгаа эсэхийг шалгах
      await Menus.find({ name: req.body.name })
        .then(async (result) => {
          if (result.length <= 1) {
            // Системий нэр давхцаагүй бол бүртгэл үүсгэх
            await Menus.findByIdAndUpdate(
              req.body._id,
              {
                parent: req.body.parent,
                name: req.body.name,
                link: req.body.link,
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
            // Системий нэр давхцвал алдаа өгөх
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
