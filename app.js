const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./modules/Product");
require("dotenv").config(); // keep it like it if you do not have Heroku
/* if (process.env.NODE_ENV == "development") { // to be deployed in Heroku
    require("dotenv").config();
  } */

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors());

//Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ROUTES

let product = [];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// POST - create one product
app.post("/product", async (req, res) => {
  const product = new Product({
    img: req.body.img,
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET - List of Products

app.get("/shop-list", async (req, res) => {
  const shopList = await Product.find({}).exec();
  if (!shopList) throw Error("No Items");
  res.status(200).json(shopList);
});

// listen

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server run on port ${PORT}`)); // npm run "start" https://www.youtube.com/watch?v=kV6MJ9W4whM for nodemon
