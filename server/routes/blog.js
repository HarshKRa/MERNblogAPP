import express from "express";
import AuthController from "../controllers/authController.js";
import blogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryControllers.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleWare.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/users/register", AuthController.userRegistration);
router.post("/users/login", AuthController.userLogin);

// Protected Routes

router.get(
  "/get/allblogs",
  checkIsUserAuthenticated,
  blogController.getAllBlog
);
router.post(
  "/add/blog",
  checkIsUserAuthenticated,
  upload.single("thumbnail"),
  blogController.addNewBlog
);
router.get(
  "/get/blog/:id",
  checkIsUserAuthenticated,
  blogController.getSinleBlog
);

router.get(
  "/get/categories",
  checkIsUserAuthenticated,
  CategoryController.getAllCategories
);
router.post(
  "/add/category",
  checkIsUserAuthenticated,
  CategoryController.addNewCategories
);

export default router;
