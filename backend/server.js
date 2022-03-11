import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/flipkarta', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", (req, res) => {
  res.send("Server Started");
});

// app.get("/api/products", (req, res) => {
//   res.send(data.product);
// });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// app.get("/api/products/:id", (req, res) => {
//   let product = data.product.find((a) => a._id === req.params.id);

//   if (product) {
//     console.log("test", product);
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product Not Found" });
//   }
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
