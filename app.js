const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database/db');

//Setting up the application.
const app = express();

//Setting up the mysql connection.
app.use(function (req, res, next) {
  res.locals.connection = db;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});

//Setting up routes
const index = require('./routes/index');
const employees = require('./routes/employees');
const equipment = require('./routes/equipment');
const reservations = require('./routes/reservations');
const login = require('./routes/login');
const register = require('./routes/register');

app.use('/', index);
app.use('/employees', employees);
app.use('/equipment', equipment);
app.use('/reservations', reservations);
app.use('/login', login);
app.use('/register', register);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 4000;
module.exports = app;

let server = app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});

server.setTimeout(0, function() {
  console.log('Server timed out');
});

module.exports = app;