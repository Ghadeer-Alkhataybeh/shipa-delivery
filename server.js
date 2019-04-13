const express = require("express");
const request = require("request");
const app = express();
const fs = require("fs");
const util = require("util");

let log_file = fs.createWriteStream(__dirname + "/weather.log", {
  flags: "w"
});
let log_stdout = process.stdout;

console.log = function(d) {
  //
  log_file.write(util.format(d) + "\n");
  log_stdout.write(util.format(d) + "\n");
};

const url =
  "http://api.apixu.com/v1/current.json?key=2cb6b9c413914d02bc775202180507&q=Dubai";

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  request(url, function(err, response, body) {
    if (err) {
      console.log("error:", error);
    } else {
      res.send(body);
      console.log(body);
    }
  });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
