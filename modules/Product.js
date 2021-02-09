const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  img: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type:Number,
    require: true
  }
});

module.exports = mongoose.model("Product", ProductSchema); 
