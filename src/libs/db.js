import mongoose from "mongoose";

const connection = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  mongoose.set("strictQuery", false);
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log("MONGODB is connected: " + conn.connection.host);
};

export default connection;
