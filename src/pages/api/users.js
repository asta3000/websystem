import bcrypt from "bcrypt";
import connection from "@/libs/db";
import Users from "../../models/all_users";
import Permissions from "../../models/all_permissions";
import Systems from "../../models/all_systems";
import Enterprises from "@/models/all_enterprises";
import jwt from "jsonwebtoken";

export default async function (req, res) {
  await connection();

  if (req.method === "POST") {
    // ------------------------
    // Хэрэглэгч бүртгэх үйлдэл
    // ------------------------
    if (
      req.body.firstname &&
      req.body.lastname &&
      req.body.phone &&
      req.body.email &&
      req.body.status &&
      req.body.permission &&
      req.body.action === undefined
    ) {
      // Имэйл хаяг давхцаж байгаа эсэхийг шалгах
      await Users.find({ email: req.body.email })
        .then(async (result) => {
          if (result === null || result.length === 0) {
            // Имэйл хаяг давхцаагүй бол бүртгэл үүсгэх
            await Users.create(req.body)
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((error) => {
                console.log(error);
                res.status(400).end();
              });
          } else {
            // Имэйл хаяг давхцвал алдаа өгөх
            res.status(400).end();
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).end();
        });
    } else if (
      req.body.email &&
      req.body.password &&
      req.body.action === undefined
    ) {
      // ------------
      // Login үйлдэл
      // ------------
      const user = await Users.findOne({
        email: req.body.email,
        status: 1,
      }).select("+password");

      if (!user) {
        res.status(401).end();
      }

      // Нууц үг зөв оруулсан эсэхийг шалгаж байна
      const is_user_pass = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (is_user_pass) {
        // JWT бэлтгэх
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: process.env.JWT_EXPIRE_IN }
        );

        res.status(200).json({
          user,
          token,
        });
      } else {
        res.status(401).end();
      }
    } else if (
      req.body.email &&
      req.body.password &&
      req.body.action === "password"
    ) {
      // --------------------
      // Нууц үг солих үйлдэл
      // --------------------
      await Users.find({ email: req.body.email })
        .then(async (result) => {
          if (result.length === 1) {
            // Нууц үгийг нууцлах
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);

            // Имэйл хаяг давхцаагүй бол нууц үг өөрчлөх
            await Users.findByIdAndUpdate(
              result[0]._id,
              {
                password,
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
            // Имэйл хаяг олдохгүй, эсвэл олон бол алдаа өгөх
            res.status(400).end();
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).end();
        });
    }
  } else if (req.method === "GET") {
    const users = await Users.find();
    const permissions = await Permissions.find();
    const systems = await Systems.find({ status: 1 });
    const enterprises = await Enterprises.find({ status: 1 });

    if (!users || !permissions || !systems || !enterprises) {
      res.status(401).end();
    }

    res.status(200).json({
      users,
      permissions,
      systems,
      enterprises,
    });
  } else if (req.method === "PUT") {
    if (
      req.body.firstname &&
      req.body.lastname &&
      req.body.phone &&
      req.body.email &&
      req.body.status &&
      req.body.permission &&
      req.body.enterprise === undefined &&
      req.body.system === undefined
    ) {
      // Имэйл хаяг бүртгэлтэй байгаа эсэхийг шалгах
      await Users.find({ email: req.body.email })
        .then(async (result) => {
          if (result.length <= 1) {
            // Имэйл хаяг бүртгэлтэй бол бүртгэл үүсгэх
            await Users.findByIdAndUpdate(
              req.body._id,
              {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                permission: req.body.permission,
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
            // Имэйл хаяг олдохгүй бол алдаа өгөх
            res.status(400).end();
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).end();
        });
    } else if (req.body.enterprise && req.body.system && req.body._id) {
      // Хэрэглэгчид систем, байгууллагыг холбох
      // Хэрэглэгчийн имэйл давхцаж байгаа эсэхийг шалгах
      await Users.find({ email: req.body.email })
        .then(async (result) => {
          if (result.length === 1) {
            // Хэрэглэгчийн имэйл давхцаагүй бол бүртгэл үүсгэх
            await Users.findByIdAndUpdate(
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
            // Хэрэглэгчийн имэйл давхцвал алдаа өгөх
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
