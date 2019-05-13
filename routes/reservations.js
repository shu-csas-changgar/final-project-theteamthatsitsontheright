let express = require('express');
let router = express.Router();
const mysql = require('mysql');

router.get('/', function(req, res, next) {
    const sql = 'SELECT * FROM reservation INNER JOIN room USING(room_id) INNER JOIN office USING(office_id)';
    res.locals.connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    })
});

router.post('/new', (req, res, next) => {
    const sql = 'INSERT INTO reservation(reservation_name, room_id, reservation_start, reservation_end) VALUES(?, ?, ?, ?)';
    const start = req.body.new_start_time;
    const end = req.body.new_end_time;
    const replaces = [req.body.new_reservation_name, req.body.new_room_id, start, end];
    const sql_query = mysql.format(sql, replaces);
    res.locals.connection.query(sql_query, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    })
});

router.post('/delete', (req, res, next) => {
    const sql = 'DELETE FROM reservation WHERE reservation_id = ?';
    const replaces = [req.body.reservation_id];
    const sql_query = mysql.format(sql, replaces);
    res.locals.connection.query(sql_query, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    })
});

router.post('/filter_personal', (req, res, next) => {
    const sql =
        'SELECT * ' +
            'FROM reservation ' +
                'INNER JOIN equipment_reservation ' +
                    'USING(reservation_id) ' +
                'INNER JOIN equipment ' +
                    'USING(equipment_id) ' +
                'INNER JOIN office ' +
                    'USING(office_id) ' +
                'INNER JOIN equipment_type ' +
                    'USING(equipment_type_id) ' +
                'INNER JOIN employee ' +
                    'USING(employee_id) ' +
            'WHERE employee_id = ?';
    const replaces = [req.body.search];
    const sql_query = mysql.format(sql, replaces);
    res.locals.connection.query(sql_query, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    })
});

module.exports = router;
