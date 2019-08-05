const mysql = require("mysql");

const db = mysql.createConnection(process.env.DB_CONNECTION_STRING);

module.exports = db;
