import { Schema, model, models } from "mongoose";

const EnterprisesSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: [50, "Өгөгдлийн урт 50 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  register: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: [10, "Өгөгдлийн урт 10 тэмдэгтээс хэтрэхгүй..."],
    match: [/[0-9]{7,10}/, "Форматын алдаатай байна"],
  },
  email: {
    type: String,
    required: [true, "Өгөгдлийг оруулна уу..."],
    trim: true,
    unique: true,
    maxlength: [100, "Өгөгдлийн урт 100 тэмдэгтээс хэтрэхгүй..."],
    match: [
      /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/,
      "Форматын алдаатай байна",
    ],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/[0-9]{8}/, "Форматын алдаатай байна"],
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
  //   type: String,
  //   trim: true,
  //   required: false,
  // },
  m_date: {
    type: Date,
    required: false,
  },
  // m_by: {
  //   type: String,
  //   trim: true,
  //   required: false,
  // },
});

const Enterprises =
  models.all_enterprises || model("all_enterprises", EnterprisesSchema);

export default Enterprises;
