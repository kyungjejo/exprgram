const mysql = require('mysql');
const connection = mysql.createPool({
host: '210.89.188.28',
port: 3306,
user: 'kixlab',
password: 'kixlab2019!',
database: 'kixlab'
});

module.exports=connection;