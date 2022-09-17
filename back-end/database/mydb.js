const mysql = require("mysql2");

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pasan20951",
    database: "mydb"
});

module.exports = {con};