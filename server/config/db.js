const mysql = require('mysql');

const db = mysql.createPool({
    "host": "database-1.c8ilxl9ubtzj.ap-northeast-1.rds.amazonaws.com",
    "user": "admin",
    "password": "antjd1212",
    "port": "3306",
    "database": "management"
});

module.exports = db;