var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var session = require('express-session');
var passport = require('passport');

var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

http.listen(port, function(){
	console.log('listening on *:' + port);
});

require('./models/DBinit').init(function(){});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: '71bcafd4944bad5a06112d81fd80c4ab615f2b34', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

var routes = require('./routes/index');
var users = require('./routes/users');
var discovers = require('./routes/discovers');
app.use('/', routes);
app.use('/users', users);
app.use('/discovers', discovers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

require("cf-deployment-tracker-client").track();
