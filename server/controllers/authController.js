import AuthModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  static userRegistration = async (req, res) => {
    // res.send("User registration");
    const { username, email, password } = req.body;
    // console.log(username,email,password)
    try {
      if (username && email && password) {
        const isUser = await AuthModel.findOne({ email: email });
        if (!isUser) {
          // password hashing
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, genSalt);

          // Sve a User

          const newUser = new AuthModel({
            username,
            email,
            password: hashedPassword,
          });

          const saveUser = await newUser.save();

          if (saveUser) {
            return res.status(200).json({ message: "userSaved" });
          }
        } else {
          return res.status(400).json({ message: "email already exists" });
        }
      } else {
        return res.status(400).json({ message: "all fileds are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static userLogin = async (req, res) => {
    // res.send("User login")
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isEmail = await AuthModel.findOne({ email });
        if (isEmail) {
          if (
            isEmail.email === email &&
            (await bcryptjs.compare(password, isEmail.password))
          ) {
            // Genetrate token

            console.log(isEmail._id);
            var token = jwt.sign({ userId: isEmail._id }, "pleaseSubscribe", {
              expiresIn: "2d",
            });
            return res.status(200).json({
              massage: "Login Successfully",
              token,
              name: isEmail.username,
            });
          } else {
            return res
              .status(400)
              .json({ message: "Wrong Email id and password1" });
          }
        } else {
          return res.status(400).json({ message: "Email id not found" });
        }
      } else {
        return res.status(400).json({ message: "All fileds are required" });
      }
    } catch (error) {
      return res.status(400).json({ massage: error.massage });
    }
  };
}

export default AuthController;
