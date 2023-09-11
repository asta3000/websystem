import connection from "@/libs/db";
import Permissions from "../../models/all_permissions";

export default async function (req, res) {
  await connection();

  if (req.method === "POST") {
    res.status(200).end();
  } else if (req.method === "GET") {
    const datas = await Permissions.find();

    if (!datas) {
      res.status(401).end();
    }

    res.status(200).json({
      datas,
    });
  }
}
