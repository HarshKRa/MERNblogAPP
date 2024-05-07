import mongoose from "mongoose";

const connectTomongo = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://harsh726181:blog0506@cluster0.6ibs6zv.mongodb.net/blogapp"
  );
  if (res) {
    console.log("connected sucessfull DB", res.connection.host);
  } else {
    console.log("Connection error");
  }
};

export default connectTomongo;
