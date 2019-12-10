const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { handleRange } = require("../utils/handleRange");

router.get("/query", (req, res) => {
  let query = req.query;
  console.log(query);
  let assetsPath = path.resolve(
    __dirname,
    `../assets/${query.file}/${query.type}`
  );
  let isExists = fs.existsSync(assetsPath);
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  if (!isExists) {
    res.end(
      JSON.stringify({
        err: `您要找的 '${query.file}' 资源不存在`
      })
    );
  }
  let statObj = fs.statSync(path.join(assetsPath, "music.mp4"));
  res.end(
    JSON.stringify({
      filename: `${query.file}`,
      size: statObj.size
    })
  );
});
router.get("/down", (req, res) => {
  let query = req.query;
  let [, start, end] = req.headers["range"].match(/\w=(.*?)-(.*?)$/);
  let assetsPath = path.resolve(
    __dirname,
    `../assets/${query.file}/${query.type}/music.mp4`
  );
  var stats = fs.statSync(assetsPath);
  let { Start, End, statusCode, AcceptRanges, ContentRange } = handleRange(
    ~~start,
    ~~end,
    ~~stats.size
  );
  res.statusCode = statusCode;
  if (statusCode == 416) {
    res.set({
      statusCode,
      "Content-Range": ContentRange,
      "Content-Type": "text/plain"
    });
    res.end("assets length invalid");
  }
  res.set({
    "Accept-Ranges": AcceptRanges,
    "Content-Range": ContentRange,
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename=${query.file}.mp4`,
    "Content-Length": End - Start + 1
  });
  fs.createReadStream(assetsPath, { start: Start, end: End }).pipe(res);
});
module.exports = router;
