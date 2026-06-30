import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Flipkarta API is running" });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/flipkarta";

mongoose.set("strictQuery", true);

const startServer = async () => {
  try {
    await mongoose.connect(mongoUrl);
    app.listen(port, () => {
      console.log(`Server at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();