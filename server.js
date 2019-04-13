const express = require("express");
const request = require("request");
const app = express();
const fs = require("fs");
const util = require("util");
const bodyParser = require("body-parser");
var dbConnection = require("./db.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let log_file = fs.createWriteStream(__dirname + "/weather.log", {
  flags: "a"
});

let weather = function(d) {
  log_file.write(util.format(d) + "\n");
};

let getData = function(url) {
  return new Promise(function(resolve, reject) {
    request(url, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  const url =
    "http://api.apixu.com/v1/current.json?key=2cb6b9c413914d02bc775202180507&q=Dubai";
  let promisedData = getData(url);

  promisedData
    .then(result => {
      let weath = {
        time: result.location.localtime,
        celsiusTemp: result.current.temp_c,
        weatherStatus: result.current.condition.text,
        windSpeed: result.current.wind_kph
      };
      res.send(weath);
      weather(weath);
      // // Query to insert the weather information
      // let query = `insert into weather values
      //     (null,\"${weath.time}\",\"${weath.weatherStatus}\",\"${
      //   weath.celsiusTemp
      // }\",\"${weath.windSpeed}\")`;

      // // insert weather information to the database
      // dbConnection.db.query(query, function(err, result) {
      //   if (result) {
      //     res.send("Saved");
      //   } else {
      //     res.send("Error");
      //   }
      // });
      //   console.log(weath);
    })
    .then(() => {
      console.log("Process finished, waiting 5 minutes till the next update");
    })

    .catch(err => console.log(err));
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
