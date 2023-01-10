import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config();

let app = express();
// cho phep client truy cap api
app.use(cors())

//config app
// Để đọc phần body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

app.use((req, res, next) => {
  res.status(404).send("Page No Found");
});

let port = process.env.PORT;

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is runing on the port : " + port);
});
