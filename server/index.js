import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
mongoose.set("strictQuery", true);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// Api
import authRoute from "./routes/auth.route.js";
import orderRoute from "./routes/order.route.js";
import serverInfoRoute from "./routes/serverInfo.route.js";

app.use("/api/auth", authRoute);
app.use("/api/orders", orderRoute);
app.use("/api/server", serverInfoRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

// Connect database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

const port = process.env.PORT || 8080;

app.listen(port, () => {
  connectDB();
  console.log(`Backend server is running on port ${port}!`)
});
