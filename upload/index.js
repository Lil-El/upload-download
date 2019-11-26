const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const multer = require("multer");
var upload = multer({ dest: "../temp" });
const multiparty = require("multiparty");
const { mergeFragment } = require("../utils");
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.post("/queryName", (req, res) => {
  let form = new multiparty.Form();
  form.parse(req, function(err, fields, file) {
    console.log(fields.fileName);
    let isExists = fs.existsSync(__dirname, `../temp/${fields.fileName}`);
    /**
     * 通过temp计算上传的大小
     */
    if (!isExists) {
      res.end("0");
    }
    res.end("0");
  });
});
app.post("/uploadFile", upload.single("file"), (req, res) => {
  let { index, isEnd } = req.body;
  fs.renameSync(
    path.resolve(__dirname, `../temp/${req.file.filename}`),
    path.resolve(__dirname, `../temp/${req.file.filename + "-" + index}`)
  );
  if (isEnd == "true") {
    mergeFragment(
      path.resolve(__dirname, "../temp"),
      path.resolve(__dirname, `../assets/${req.file.originalname}`)
    );
  }
  res.end("upload success");
});

app.listen(8080, () => {
  console.log("http://127.0.0.1:8080/");
});
