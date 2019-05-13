const mysql = require('mysql');

//Create the connection.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Summer2019CSM',
    database: 'abc-corp'
});

//Connect to MySQL server.
connection.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Connected to MySQL server at ' + connection.threadId);
    }
});

module.exports = connection;