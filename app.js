require('dotenv').config();

var express = require('express');
var app = express();

var user = require('./controllers/userController');
var meetup = require('./controllers/meetupController');
var log = require('./controllers/logController');

var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync();

app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/meetup', meetup);
app.use('/log', log);

app.listen(process.env.PORT, function(){
  console.log(`app is listening on ${process.env.PORT}`);
});