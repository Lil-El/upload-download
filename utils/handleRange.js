/**
 * @description
 * @param {path}
 * @param {path}
 */

const path = require("path");
function handleRange(start, end, totalLength) {
  let statusCode = 206;
  let ContentRange;
  let result = {
    Start: isNaN(start) ? 0 : start,
    End: isNaN(end) ? totalLength - 1 : end
  };
  // if (start && !end) {
  //   result.Start = start;
  //   result.End = totalLength - 1;
  // }
  // if (!start && end) {
  //   console.log("1");
  //   result.Start = totalLength - end;
  //   result.End = totalLength - 1;
  // }
  if (start >= totalLength || end >= totalLength) {
    statusCode = 416;
    ContentRange = `bytes */${totalLength}`;
    return { statusCode, ContentRange };
  }
  let AcceptRanges = "bytes";
  ContentRange = `bytes ${result.Start}-${
    result.End ? result.End : totalLength - 1
  }/${totalLength}`;
  return { ...result, statusCode, AcceptRanges, ContentRange };
}
module.exports = { handleRange };
