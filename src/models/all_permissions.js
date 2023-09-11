import { Schema, model, models } from "mongoose";

const PermissionsSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: [10, "Өгөгдлийн урт 10 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: [50, "Өгөгдлийн урт 50 тэмдэгтээс хэтрэхгүй..."],
    trim: true,
  },
});

const Permissions =
  models.all_permissions || model("all_permissions", PermissionsSchema);

export default Permissions;
