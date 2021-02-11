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

let products = [];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// POST - create one product
app.post("/product", async (req, res) => {
  const product = new Product({
    img: req.body.img,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
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

// GET only one Product selected by ID

app.get("/product/:productId", async (req, res)=>{
 const productId = req.params.productId;
 console.log(productId); 
 const product = await Product.findOne({_id: productId});
 if (!product) {
     res.status(404).end();
 }else{
     res.json(product);
 }
});

// DELETE

app.delete("/product/:productId", async (req, res) => {
    const productId = req.params.productId;
    await Product.deleteOne({ _id: productId }).exec(); //
    res.status(204).end();
  });

// PATCH - Change the details of a Product selected by Id

 app.patch("product/:productId", async (req, res) =>{
try{
    const product = await Product.findByIdAndUpdate(req.params.productId , req.body,{
        new: true,
    }).exec();
}catch(err){
    console.log(err);
    res.status(500).json({message: "an internal error has occurred"});
}
}); 

// listen

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server run on port ${PORT}`)); // npm run "start" https://www.youtube.com/watch?v=kV6MJ9W4whM for nodemon
