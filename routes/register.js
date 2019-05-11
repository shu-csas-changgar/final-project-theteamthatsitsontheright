const express = require('express');
const router = express.Router();
const mysql = require('mysql');

toTitleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
};

// Initial GET request for registering.  This
router.get('/', function(req, res) {
    const sql = 'SELECT office_id, office_name, location_name, address, city.name, state.name, zip_code FROM office INNER JOIN location USING(location_id) INNER JOIN city USING(city_id) INNER JOIN state USING(state_id)';
    res.locals.connection.query(sql,
        (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
        })
});

router.post('/new', function (req, res, next) {
    // Initial SQL query.  We need to determine how many people in the employee
    // database have the same name as the input.
    let sql = 'SELECT * FROM employee WHERE first_name = ? AND last_name = ?';
    let replaces = [toTitleCase(req.body.first_name), toTitleCase(req.body.last_name)];
    let sql_query = mysql.format(sql, replaces);
    res.locals.connection.query(sql_query,
        (error, results, fields) => {
            let email = '';
            // If there is an error, throw the error.
            if (error) {
                throw error;
            } else {
                // count: Results from the initial query.  Determines how many people
                // with the given name are in the database.
                const count = results.length;
                // If the count is 0, we use the auto-generated email.
                if (count === 0) {
                    email = req.body.email;
                } else {
                    // If the count is not 0, we don't want to create duplicates,
                    // so generate a new email that contains a unique number.
                    email = req.body.first_name.toLowerCase() +
                        '.' + req.body.last_name.toLowerCase()
                        + count + '@abc.com';
                }
                // Second SQL query.  Once the distinct email is created, insert a new row
                // into the employee table.
                sql = 'INSERT INTO employee(first_name, last_name, email, password, phone_number, office_id) VALUES(?, ?, ?, ?, ?, ?)';
                replaces = [toTitleCase(req.body.first_name), toTitleCase(req.body.last_name), email, req.body.password, req.body.phone_number, req.body.office_id];
                sql_query = mysql.format(sql, replaces);
                res.locals.connection.query(sql_query,
                    (error, results, fields) => {
                        if (error) {
                            throw error;
                        } else {
                            res.json(results);
                        }
                    })
            }
        });
});

module.exports = router;