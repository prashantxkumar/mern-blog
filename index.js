const express = require("express");
const connect = require("./config/db")
const app = express();
const router = require("./routes/userRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

//connect MongoDb data base
connect();

app.use("/", router);

app.listen(PORT , ()=>{
    console.log("Server is running on PORT");
});