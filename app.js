const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// mdoule import
if (process.env.NODE_ENV == "development") { // to be deployed in Heroku
    require("dotenv").config();
  }

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors());

// ROUTES

app.get("/", (req, res)=>{  
    res.send("Hello world!"); 
});

// listen 

const PORT = process.env.PORT || 3500;

app.listen(PORT, ()=> console.log(`Server run on port ${PORT}`)); // npm run "start" https://www.youtube.com/watch?v=kV6MJ9W4whM for nodemon 