const express = require("express");
const router = express.Router();
const fs = require("fs")
const path = require("path")

router.get("/query",(req,res)=>{
  let query = req.query
  console.log(query)
  let assetsPath = path.resolve(__dirname,`../assets/${query.file}/${query.type}`)
  let isExists = fs.existsSync(assetsPath)
  res.setHeader("Content-Type","text/plain;charset=utf-8")
  if(!isExists){
    res.end(JSON.stringify({
      err:`您要找的 '${query.file}' 资源不存在`
    }))
  }
  let statObj = fs.statSync(path.join(assetsPath,'music.mp4'))
  res.end(JSON.stringify({
      filename:`${query.file}`,
      size:statObj.size
  }))
});
router.get("/down",(req,res)=>{
  let query = req.query
  let assetsPath = path.resolve(__dirname,`../assets/${query.file}/${query.type}/music.mp4`)
  var stats = fs.statSync(assetsPath); 
  res.set({
  'Content-Type': 'application/octet-stream',
  'Content-Disposition': `attachment; filename=${query.file}.mp4`,
  'Content-Length': stats.size
  })
  fs.createReadStream(assetsPath).pipe(res);
});
module.exports = router;
