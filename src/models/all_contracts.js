import { Schema, model, models } from "mongoose";

const ContractsSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: [50, "Өгөгдлийн урт 50 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  number: {
    type: String,
    required: true,
    maxlength: [20, "Өгөгдлийн урт 20 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  start_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  end_date: {
    type: Date,
    default: Date.now,
    required: true,
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

const Contracts =
  models.all_contracts || model("all_contracts", ContractsSchema);

export default Contracts;
