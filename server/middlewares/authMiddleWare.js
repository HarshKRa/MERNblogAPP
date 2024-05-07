import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated = async (req, res, next) => {
  let token;

  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      const userID = jwt.verify(token, "pleaseSubscribe");

      req.user = await authModel.findById(userID.userId).select("--password");
      next();
    } catch (error) {
      return res.status(401).json({ massage: "unAuthorized User1" });
    }
  } else {
    return res.status(401).json({ massage: "unAuthorized User" });
  }
};

export default checkIsUserAuthenticated;
