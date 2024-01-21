import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

mongoose.connect(process.env.MONGO_URL);

// routes
app.use("/api", routes());

app.listen(process.env.PORT, () =>
  console.log(`Server run -> http://localhost:${process.env.PORT}`)
);
