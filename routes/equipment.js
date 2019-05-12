const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/**
 * Equipment GET request.  Simply returns all information for each piece of equipment in the table.
 */
router.get('/', function (req, res, next) {
    const sql =
        'SELECT equipment_id, equipment_name, vendor_name, type_name, contract_name, office_name, expire_date ' +
            'FROM equipment ' +
                'INNER JOIN contract_type ' +
                    'USING(contract_type_id) ' +
                'INNER JOIN equipment_type ' +
                    'USING(equipment_type_id) ' +
                'INNER JOIN office ' +
                    'ON equipment.office_id = office.office_id ' +
                'INNER JOIN vendor ' +
                    'USING(vendor_id)';
    console.log(sql);
    res.locals.connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            console.log(results);
            res.json(results);
        }
    })
});

router.get('/contract_types', (req, res, next) => {
    const sql = 'SELECT * FROM contract_type';
    res.locals.connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    })
});

router.get('/equipment_types', (req, res, next) => {
    const sql = 'SELECT * FROM equipment_type';
    res.locals.connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    })
});

router.post('/filter', (req, res, next) => {
    const sql =
        'SELECT * ' +
            'FROM equipment ' +
                'INNER JOIN equipment_type ' +
                    'USING(equipment_type_id) ' +
                'INNER JOIN contract_type ' +
                    'USING(contract_type_id) ' +
                'INNER JOIN office ' +
                    'USING(office_id) ' +
                'INNER JOIN vendor ' +
                    'USING(vendor_id) ' +
            'WHERE equipment_type_id = ? ' +
                'AND contract_type_id = ? ' +
                'AND ' + req.body.search_field + ' LIKE ?';
    const replaces = [req.body.equipment_type, req.body.contract_type, '%' + req.body.search + '%'];
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