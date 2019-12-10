const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const multer_upload = multer({ dest: path.resolve(__dirname, "../temp") });
const multiparty = require("multiparty");
const { mergeFragment } = require("../utils/mergeFragment");
const router = express.Router();

router.post("/queryName", (req, res) => {
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
router.post("/uploadFile", multer_upload.single("file"), (req, res) => {
  let { index, isEnd } = req.body;
  fs.renameSync(
    path.resolve(__dirname, `../temp/${req.file.filename}`),
    path.resolve(__dirname, `../temp/${req.file.filename + "-" + index}`)
  );
  if (isEnd == "true") {
    mergeFragment(
      path.resolve(__dirname, "../temp"),
      path.resolve(
        __dirname,
        `../assets/${req.file.originalname.split(".")[0]}/${
          req.file.originalname
        }`
      )
    );
  }
  res.end("upload success");
});

module.exports = router;
