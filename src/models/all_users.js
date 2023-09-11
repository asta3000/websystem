import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UsersSchema = new Schema({
  // department: {
  //   type: Schema.ObjectId,
  //   ref: "all_companies",
  //   // required: true,
  // },
  lastname: {
    type: String,
    required: true,
    maxlength: [50, "Өгөгдлийн урт 50 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  firstname: {
    type: String,
    required: true,
    maxlength: [50, "Өгөгдлийн урт 50 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
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
  password: {
    type: String,
    required: false,
    trim: true,
    maxlength: [250, "Өгөгдлийн урт 250 тэмдэгтээс хэтрэхгүй..."],
    minlength: 6,
    select: false,
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
  permission: {
    type: String,
    required: true,
    trim: true,
    default: "64763542503a408d9812657d",
    maxlength: [24, "Өгөгдлийн урт 24 тэмдэгтээс хэтрэхгүй..."],
    match: [/[A-Za-z0-9]{24}/, "Форматын алдаатай байна"],
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
  enterprise: {
    type: String,
    required: false,
    trim: true,
    maxlength: [50, "Өгөгдлийн урт 50 тэмдэгтээс хэтрэхгүй..."],
  },
  system: {
    type: String,
    required: false,
    trim: true,
    maxlength: [50, "Өгөгдлийн урт 50 тэмдэгтээс хэтрэхгүй..."],
  },
});

const Users = models.all_users || model("all_users", UsersSchema);

export default Users;
