/**
 * @description 'Function:合并文件'
 * @param {path} tempDirPath 'temp目录的某目录'
 * @param {path} assetsPath '合并后文件在assets的path'
 */
const fs = require("fs");
const path = require("path");
function mergeFragment(tempDirPath, assetsPath) {
  if (fs.existsSync(assetsPath)) {
    fs.unlinkSync(assetsPath);
  }
  let chunks = fs.readdirSync(tempDirPath);
  fs.writeFileSync(assetsPath, "");
  chunks = chunks.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  for (let i = 0; i < chunks.length; i++) {
    fs.appendFileSync(
      assetsPath,
      fs.readFileSync(path.resolve(tempDirPath, chunks[i]))
    );
    fs.unlinkSync(path.resolve(tempDirPath, chunks[i]));
  }
}
module.exports = { mergeFragment };
