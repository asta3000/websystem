import { Schema, model, models } from "mongoose";

const MenusSchema = new Schema({
  parent: {
    type: String,
    required: false,
    maxlength: [25, "Өгөгдлийн урт 25 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: [50, "Өгөгдлийн урт 50 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  link: {
    type: String,
    required: true,
    maxlength: [50, "Өгөгдлийн урт 500 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  status: {
    type: Number,
    required: true,
    trim: true,
    default: 1,
    min: 1,
    max: 2,
    maxlength: 2,
    match: [/[0-9]{1}/, "Форматын алдаатай байна"],
  },
  c_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // c_by: {
  //   type: Schema.ObjectId,
  //   ref: "all_users",
  //   // required: true,
  // },
  m_date: {
    type: Date,
    required: false,
  },
  // m_by: {
  //   type: Schema.ObjectId,
  //   ref: "all_users",
  //   required: false,
  // },
});

const Menus = models.all_menus || model("all_menus", MenusSchema);

export default Menus;
