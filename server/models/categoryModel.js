import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  title: {
    type: String,
  },
});

const CategoryModel = mongoose.model("Categories", categorySchema);

export default CategoryModel;
