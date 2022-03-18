const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(require("./Routes/Route"));
const DB = process.env.MONGODB_URL;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));
app.listen(process.env.PORT, () => {
  console.log("App Is Running On: http://localhost:8000");
});
