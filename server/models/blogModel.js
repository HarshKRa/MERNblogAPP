import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "Categories",
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "User",
  },
});

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
