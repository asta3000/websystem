import connection from "@/libs/db";
import Systems from "../../models/all_systems";

export default async function (req, res) {
  await connection();

  if (req.method === "POST") {
    // Доорх мэдээлэл байвал шинэ бүртгэл гэж үзэх
    if (req.body.name && req.body.desc && req.body.status) {
      // Системийн нэр давхцаж байгаа эсэхийг шалгах
      await Systems.find({ name: req.body.name })
        .then(async (result) => {
          if (result === null || result.length === 0) {
            // Системийн нэр давхцаагүй бол бүртгэл үүсгэх
            await Systems.create({
              name: req.body.name,
              desc: req.body.desc,
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
    const datas = await Systems.find();

    if (!datas) {
      res.status(401).end();
    }

    res.status(200).json({
      datas,
    });
  } else if (req.method === "PUT") {
    if (req.body.name && req.body.desc && req.body.status) {
      // Системий нэр давхцаж байгаа эсэхийг шалгах
      await Systems.find({ name: req.body.name })
        .then(async (result) => {
          if (result.length <= 1) {
            // Системий нэр давхцаагүй бол бүртгэл үүсгэх
            await Systems.findByIdAndUpdate(
              req.body._id,
              {
                name: req.body.name,
                desc: req.body.desc,
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
