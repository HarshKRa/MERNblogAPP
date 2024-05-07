import blogModel from "../models/blogModel.js";

class blogController {
  static getAllBlog = async (req, res) => {
    try {
      const fetchAllBlog = await blogModel.find({ user: req.user._id });
      return res.status(200).json(fetchAllBlog);
    } catch (error) {
      return res.status(400).json({ massage: error.massage });
    }
  };
  static addNewBlog = async (req, res) => {
    const { title, category, description } = req.body;

    try {
      if (title && category && description) {
        console.log("Not Added");

        console.log(title, category, description);
        const addBlog = new blogModel({
          title: title,
          description: description,
          category: category,
          thumbnail: req.file.filename,
          user: req.user._id,
        });

        console.log("Not Added");

        const saveBlog = await addBlog.save();

        console.log("Not Added 1");

        if (saveBlog) {
          return res.status(200).json({ massage: "Blog Added Sucessfully" });
        } else {
          return res.status(400).json({ massage: "Blog not added" });
        }
      } else {
        return res.status(400).json({ massage: "All fileds are reqiured" });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ massage: error.massage, massage1: "Invalid URL" });
    }
  };
  static getSinleBlog = async (req, res) => {
    const { id } = req.params;

    try {
      if (id) {
        const fetchBlogID = await blogModel.findById(id);
        return res.status(200).json(fetchBlogID);
      } else {
        return res.status(400).json({ massage: "Invalid URL" });
      }
    } catch (error) {
      return res.status(400).json({ massage: error.massage });
    }
  };
}

export default blogController;
