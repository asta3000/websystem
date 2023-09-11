import connection from "@/libs/db";
import Contracts from "../../models/all_contracts";
import Systems from "../../models/all_systems";
import Enterprises from "@/models/all_enterprises";

export default async function (req, res) {
  await connection();

  if (req.method === "POST") {
    // Доорх мэдээлэл байвал шинэ бүртгэл гэж үзэх
    if (
      req.body.name &&
      req.body.number &&
      req.body.status &&
      req.body.start_date &&
      req.body.end_date
    ) {
      // Гэрээний дугаар давхцаж байгаа эсэхийг шалгах
      await Contracts.find({ number: req.body.number })
        .then(async (result) => {
          if (result === null || result.length === 0) {
            // Гэрээний дугаар давхцаагүй бол бүртгэл үүсгэх
            await Contracts.create({
              name: req.body.name,
              number: req.body.number,
              start_date: req.body.start_date,
              end_date: req.body.end_date,
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
            // Гэрээний дугаар давхцвал алдаа өгөх
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
    const datas = await Contracts.find();
    const systems = await Systems.find({ status: 1 });
    const enterprises = await Enterprises.find({ status: 1 });

    if (!datas || !systems || !enterprises) {
      res.status(401).end();
    }

    res.status(200).json({
      datas,
      systems,
      enterprises,
    });
  } else if (req.method === "PUT") {
    if (
      req.body.name &&
      req.body.number &&
      req.body.status &&
      req.body.start_date &&
      req.body.end_date &&
      req.body.system === undefined &&
      req.body.enterprise === undefined
    ) {
      // Гэрээний дугаар давхцаж байгаа эсэхийг шалгах
      await Contracts.find({ number: req.body.number })
        .then(async (result) => {
          if (result.length <= 1) {
            // Гэрээний дугаар давхцаагүй бол бүртгэл үүсгэх
            await Contracts.findByIdAndUpdate(
              req.body._id,
              {
                name: req.body.name,
                number: req.body.number,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
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
            // Гэрээний дугаар давхцвал алдаа өгөх
            res.status(400).end();
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).end();
        });
    } else if (req.body.enterprise && req.body.system && req.body._id) {
      console.log(req.body);
      // Гэрээнд систем, байгууллагыг холбох
      // Гэрээний дугаар давхцаж байгаа эсэхийг шалгах
      await Contracts.find({ number: req.body.number })
        .then(async (result) => {
          if (result.length === 1) {
            // Гэрээний дугаар давхцаагүй бол бүртгэл үүсгэх
            await Contracts.findByIdAndUpdate(
              req.body._id,
              {
                enterprise: req.body.enterprise,
                system: req.body.system,
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
            // Гэрээний дугаар давхцвал алдаа өгөх
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
