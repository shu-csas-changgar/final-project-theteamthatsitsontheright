let express = require('express');
let router = express.Router();
const mysql = require('mysql');

router.get('/', function(req, res, next) {
    res.render('reservations', {title: 'ABC Corp'});
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