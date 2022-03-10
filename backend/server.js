import express from "express";
import data from "./data.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Server Started");
});

app.get("/api/products", (req, res) => {
  res.send(data.product);
});

app.get("/api/products/:id", (req, res) => {

  let product = data.product.find((a) => a._id === req.params.id);

  if (product) {
    console.log('test', product)
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
