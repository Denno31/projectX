const mysql = require("mysql2/promise");

// Create a database connection
const db = mysql.createConnection({
  host: "198.38.84.57",
  user: "ericm999",
  password: "@#1Cadiff",
  database: "admin_HotelPlusConfigurator",
});

module.exports = { db };
