const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/user.model");
const router = require("./router");
require("./config/db");
User.sync();
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to application" });
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
