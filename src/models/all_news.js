import { Schema, model, models } from "mongoose";

const NewsSchema = new Schema({
  mainmenu: {
    type: String,
    required: true,
    maxlength: [25, "Өгөгдлийн урт 25 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  submenu: {
    type: String,
    required: false,
    maxlength: [25, "Өгөгдлийн урт 25 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  type: {
    type: Number,
    required: true,
    trim: true,
    default: 1,
    min: 1,
    max: 3,
    maxlength: 2,
    match: [/[0-9]{1}/, "Форматын алдаатай байна"],
  },
  title: {
    type: String,
    required: true,
    maxlength: [100, "Өгөгдлийн урт 100 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  content: {
    type: String,
    required: false,
    maxlength: [10000, "Өгөгдлийн урт 10000 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  image: {
    type: String,
    required: false,
    maxlength: [100, "Өгөгдлийн урт 100 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  file: {
    type: String,
    required: false,
    maxlength: [100, "Өгөгдлийн урт 100 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  link: {
    type: String,
    required: true,
    maxlength: [100, "Өгөгдлийн урт 100 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  comment: {
    type: Number,
    required: true,
    trim: true,
    default: 1,
    min: 1,
    max: 2,
    maxlength: 2,
    match: [/[0-9]{1}/, "Форматын алдаатай байна"],
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

const News = models.all_news || model("all_news", NewsSchema);

export default News;
