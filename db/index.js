const config = require('../config');
const mysql = require('mysql');

let connection = mysql.createConnection({
    host     : config.mysqlHost,
    port     : config.mysqlPort,
    user     : config.mysqlUser,
    password : config.mysqlPassword,
    database : config.mysqlDatabase
});

module.exports = connection;