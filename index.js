import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes/index.js";
import multer from "multer";

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded seccess");
  } catch (error) {
    console.log(error);
  }
});

mongoose.connect(process.env.MONGO_URL);

// routes
app.use("/api", routes());

app.listen(process.env.PORT, () =>
  console.log(`Server run -> http://localhost:${process.env.PORT}`)
);
