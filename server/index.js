import express from "express";
import connectTomongo from "./config/db.js";
import authRoute from "./routes/blog.js";
import cors from "cors";

const app = express();
const PORT = 9000;
connectTomongo();

app.use(cors());

app.use(express.json());

app.use(express.static("public/upload"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API Routes

app.use("/api/v1", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
