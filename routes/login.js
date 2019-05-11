const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/**
 * GET method for login route.  Not used.
 */
router.get('/', function(req, res) {
    res.render('employees', {title: 'ABC Corp'});
});

/**
 * AUTH POST method of login route.  Used when the user presses the login button on the Login React Component.
 * Sends a query to the employee table with the user email and password, and returns a list of every employee
 * with that combination.  Since employee emails are unique, this contains one user if the login was authorized,
 * or an empty list if not.
 */
router.post('/auth', function (req, res, next) {
    const sql = 'SELECT * from employee WHERE email = ? AND password = ?';
    const replaces = [req.body.email, req.body.password];
    const sql_query = mysql.format(sql, replaces);
    res.locals.connection.query(sql_query,
        function (error, results, fields) {
            if (error) {
                throw error;
            } else {
                res.json(results);
            }
        })
});

module.exports = router;