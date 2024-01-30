const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const upload = require("./route/upload");
const download = require("./route/download");

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.use("/upload", upload);
app.use("/download", download);

app.listen(8080, () => {
  console.log("http://127.0.0.1:8080/");
});
