// var mysql = require("mysql");

// // insert tht the database credential
// var dbConnection = mysql.createConnection({
//   host: "localhost",
//   user: "admin",
//   password: "1234567",
//   insecureAuth: true,
//   database: "weather"
// });

// //create the connection
// dbConnection.connect(function(err) {
//   if (err) {
//     console.log("access denied", err);
//   } else {
//     console.log("Connected successfully");
//   }
// });

// var queryWeatherTable = `
// CREATE TABLE IF NOT EXISTS weather (
//   id INTEGER NOT NULL AUTO_INCREMENT ,
//   time INTEGER NOT NULL,
//   weatherStatus text NOT NULL,
//   celsiusTemp INTEGER NOT NULL,
//   windSpeed INTEGER NOT NULL,
//   PRIMARY KEY (id)
// )`;

// // create the table
// dbConnection.query(queryWeatherTable, function(err, result) {
//   if (result) {
//     console.log("Weather table has been created");
//   } else {
//     console.log("Weather table return an ERROR");
//   }
// });

// module.exports.db = dbConnection;
