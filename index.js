import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes/index.js";
import multer from "multer";
import path from "path";
import cors from "cors";

const app = express();

const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
mongoose.connect(process.env.MONGO_URL);

// routes
app.use("/api", routes());

app.listen(process.env.PORT, () =>
  console.log(`Server run -> http://localhost:${process.env.PORT}`)
);
