import mongoose from "mongoose";

const authSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const AuthModel = mongoose.model("Users", authSchema);

export default AuthModel;
