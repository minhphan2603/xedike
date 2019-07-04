const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser'); da duoc tich hop trong express
const cors = require("cors");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/xedike", { useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch(console.log);

// parser

// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", express.static("./upload"));

app.use("/api/user", require("./Routes/api/user/user"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is running at port ${port}!`);
});
