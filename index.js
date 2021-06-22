const express = require("express");
var bodyParser = require('body-parser')
const connect = require("./config/db")
const app = express();
const router = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

//connect MongoDb data base
connect();

app.use(bodyParser.json());

app.use("/", router);
app.use('/', postRoutes);
app.listen(PORT , ()=>{
    console.log("Server is running on PORT");
});