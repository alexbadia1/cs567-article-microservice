var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  secrets = require('./config/secrets'),
  bodyParser = require('body-parser'),
  authMiddleware = require('./middleware/auth');

var app = express();

var port = process.env.PORT || 4000;

mongoose.connect(secrets.mongo_connection, { useNewUrlParser: true });

var allowCrossDomain = function (req, res, next) {
  // This is insecure, i know
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(authMiddleware);

require('./routes')(app, router);

app.listen(port);
console.log('Server running on port ' + port);
