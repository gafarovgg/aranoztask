const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AranozSchema = new Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  imageUrl: { type: String, require: true },
});

const AranozModel = mongoose.model("Aranoz", AranozSchema);

const DB_URL =
  "mongodb+srv://gafarovgg:azmp101@cluster0.fttwk0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.get("/api/products", async (req, res) => {
  try {
    const products = await AranozModel.find({});
    if (products.length > 0) {
      res.status(200).send({ message: "success", data: products });
    } else {
      res.status(204).send({ message: "data is empty" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await AranozModel.findById(id);
    if (product) {
      res.status(200).send({ message: "success", data: product });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await AranozModel.findByIdAndDelete(id);
    res.status(200).send({
      message: "deleted",
      deletedProduct: deletedProduct,
    });
  } catch (error) {
    res.status(404).send({ message: "Not Found" });
  }
});
app.post("/api/products", async (req, res) => {});


mongoose.connect(DB_URL).then(() => {
  console.log("Connected!");
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
