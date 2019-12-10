const fs = require("fs");

//0123456789
//   3456

fs.createReadStream("1.txt", {
  start: 3,
  end: 6
}).pipe(fs.createWriteStream("2.txt"));
