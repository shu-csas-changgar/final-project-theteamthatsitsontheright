let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.render('reservations', {title: 'ABC Corp'});
});

module.exports = router;