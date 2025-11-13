import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/v1/route";
import config from "./config/app.config";
import { connectDB } from "./utils/db";

const app = express();

app.use(
  cors({
    origin: config.BASE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

try {
  app.use("/api/v1", router);
  connectDB();

  app.listen(config.PORT, () => {
    console.log(`port is listening at ${config.PORT}`);
  });
} catch (error) {
  console.log("failed to start a server");
  new Error("failed to start a server");
}
