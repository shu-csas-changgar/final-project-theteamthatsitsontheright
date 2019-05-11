const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/**
 * GET method of employees route.  Called when the Employees React component is loaded.  This queries the
 * abc-corp database for a list of all employees, and returns the JSON data to the client.
 */
router.get('/', function (req, res) {
    const sql = 'SELECT employee_id, first_name, last_name, email, phone_number, office_name, location_name FROM employee INNER JOIN office USING(office_id) INNER JOIN location USING(location_id)';
    res.locals.connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    })
});

/**
 * FILTER POST method of employees route.  Called when the client clicks the filter button on the Employees
 * React component.  It uses the search value and the search_field type to query the abc-corp database,
 * and returns all rows that contain data like the search value.  Can search by first_name, last_name, and office_name.
 */
router.post('/filter', (req, res) => {
    // If the search body is empty, just return all of the employees in the table.
    if (req.body.search === '') {
        const sql =
            'SELECT employee_id, first_name, last_name, email, phone_number, office_name, location_name ' +
            'FROM employee ' +
            'INNER JOIN office ' +
            'USING(office_id) ' +
            'INNER JOIN location ' +
            'USING(location_id)';
        res.locals.connection.query(sql, (error, results, fields) => {
            if (error) {
                throw error;
            } else {
                res.send(results);
            }
        })
    } else {
        // Otherwise, create a query that searches based on whether the first_name, last_name, or office_name
        // was like the search value.
        const sql =
            'SELECT employee_id, first_name, last_name, email, phone_number, office_name, location_name ' +
            'FROM employee ' +
            'INNER JOIN office ' +
            'USING(office_id) ' +
            'INNER JOIN location ' +
            'USING(location_id) ' +
            'WHERE ' + req.body.search_field + ' LIKE ?';
        const replaces = ['%' + req.body.search + '%'];
        const sql_query = mysql.format(sql, replaces);
        res.locals.connection.query(sql_query, (error, results, fields) => {
            if (error) {
                throw error;
            } else {
                res.json(results);
            }
        });
    }
});

module.exports = router;
