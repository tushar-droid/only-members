var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("./passport-authentication");
const session = require("express-session");
require('dotenv').config();
//GETTING THE ROUTES
const homeRoute = require("./routes/home");
const loginRoute = require("./routes/login"); 
const signupRoute = require("./routes/signup");
const postsRoute = require('./routes/posts');


const dbConnect = require("./db_connection/mongoose-connection");





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true}));

app.use(passport.session());






//ROUTES
app.use("/", homeRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/posts", postsRoute);






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
