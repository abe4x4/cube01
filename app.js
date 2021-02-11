var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/create');
var aboutRouter = require('./routes/about');
var detailsRouter = require('./routes/details');
var createAccessory = require('./routes/createAccessory');
var attachAccessory = require('./routes/attachAccessory')
// var addinRouter require('./routes/edit')
// var registerRouter = require('./routes/register')
var editRouter = require('./routes/edit')
//var deleteRouter = require('./route/delete')

var app = express();

require ('dotenv').config();
mongoose.connect(process.env.DB_URI,  {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then( (res) => console.log('db connected'))
  .catch((err) => console.log(err));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials ('./views/partials')
hbs.registerHelper('isEqual', (a,b) =>{return a===b})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create', createRouter);
app.use('/about', aboutRouter);
app.use('/details', detailsRouter);
app.use('/create/accessory',createAccessory);
app.use('/attach/accessory', attachAccessory);
app.use('/edit', editRouter);
// app.use('/delete', deleteRouter);
// app.use('/register', registerRouter);
// app.use('/login', loginRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
