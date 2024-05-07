import CategoryModel from "../models/categoryModel.js";

class categoryController {
  static getAllCategories = async (req, res) => {
    try {
      const fetchAllCategories = await CategoryModel.find({});
      return res.status(200).json(fetchAllCategories);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static addNewCategories = async (req, res) => {
    const { title } = req.body;

    try {
      if (title) {
        const newCategory = new CategoryModel({
          title,
        });

        const savCategory = await newCategory.save();
        return res.status(200).json({ message: "category Added Successfully" });
      } else {
        return res.status(400).json({ message: "All fileds are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default categoryController;
