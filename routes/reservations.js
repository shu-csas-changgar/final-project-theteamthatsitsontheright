let express = require('express');
let router = express.Router();

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
                    'USING(equpiment_id) ' +
                'INNER JOIN office ' +
                    'USING(office_id) ' +
                'INNER JOIN equipment_type ' +
                    'USING(equipent_type_id) ' +
                'INNER JOIN employee ' +
                    'USING(employee_id) ' +
            'WHERE ' + req.body.search_field + ' = ' + req.body.search; 
    res.locals.connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    })
});

module.exports = router;