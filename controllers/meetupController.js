var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Meetup = sequelize.import('../models/meetup');

router.post('/', function(req, res) {
  //user will input date as '2019-08-21'
  //and time as 13:45
  //then must convert that to postgres timestamp
  // '2019-08-21 13:45:00.00-04' 
  Meetup.create({
    date: req.body.date,
    locationX: req.body.locationX,
    locationY: req.body.locationY,
    name: req.body.name,
    description: req.body.description,
    attendees: req.body.attendees,
    prereqs: req.body.prereqs,
    owner: req.user.id
  }).then(
    function(data) {
      res.json({
        name: req.body.name,
        id: data.id
      })
    },
    function(err) {
      res.send(500, err.message);
    }
  );
});

router.get('/', function(req, res) {
  //maybe where locationX is within .1 and location y is within .1?
  //Op.gte or lte
  Meetup
    .findAll({where: {locationX: req.body.locationX, locationY: req.body.locationY}})
    .then(
      function(data) {
        res.json(data);
      },
      function error(err) {
        res.send(500, err.message);
      }
    );
});

router.get('/:id', function(req, res) {
  Meetup
    .findOne({where: {id: req.params.id}})
    .then(
      function(data) {
        res.json(data);
      },
      function error(err) {
        res.send(500, err.message);
      }
    );
});

router.put('/:id', function(req, res) {
  Meetup
    .update({
      date: req.body.date,
      locationX: req.body.locationX,
      locationY: req.body.locationY,
      name: req.body.name,
      description: req.body.description,
      attendees: req.body.attendees,
      prereqs: req.body.prereqs
    },
    {where: {id: req.params.id}})
    .then(
      function(data) {
        res.json({
          date: req.body.date,
          locationX: req.body.locationX,
          locationY: req.body.locationY,
          name: req.body.name,
          description: req.body.description,
          attendees: req.body.attendees,
          prereqs: req.body.prereqs
        });
      },
      function(err) {
        res.send(500, err.message);
      }
    );
});

router.delete('/:id', function(req, res) {
  Meetup
    .destroy({where: {id: req.params.id}})
    .then(
      function (data) {
        res.send('log', req.params.id, 'removed successfully');
      },
      function (err) {
        res.send(500, err.message);
      }
    );
});

module.exports = router;