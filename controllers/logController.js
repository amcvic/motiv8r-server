var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log');

router.post('/', function(req, res) {
  Log
    .create({
      name: req.body.name,
      length: req.body.length,
      date: req.body.date,
      intensity: req.body.intensity,
      review: req.body.review,
      owner: req.user.id
    }).then(
      function(data) {
        res.json({
          name: req.body.name
        });
      },
      function(err) {
        res.send(500, err.message);
      }
    );
});

router.post('/getall', function(req, res) {
  //date falls within range
  //send date as just a month?
  // {where: {date: {[sequelize.Op.lt]: 31, [Op.gt]: 01}}}
  //not correct but something like that
  // let regex = new RegExp("/^.{5}" + req.body.month + "/", "g");
  Log
    .findAll({where: {date: {[sequelize.Op.gte]: req.body.minMonth, [sequelize.Op.lt]: req.body.maxMonth}}})
    .then(
      function(data) {
        res.json(data);
      },
      function(err) {
        res.send(500, err.message);
      }
    );
});

router.get('/:id', function(req, res) {
  Log
    .findOne({where: {id: req.params.id, owner: req.user.id}})
    .then(
      function(data) {
        res.json(data);
      },
      function(err) {
        res.send(500, err.message);
      }
    )
});

router.put('/:id', function(req, res) {
  Log
    .update({
      name: req.body.name,
      length: req.body.length,
      date: req.body.date,
      intensity: req.body.intensity,
      review: req.body.review
    },
    {where: {id: req.params.id}})
    .then(
      function(data) {
        res.json({
          name: req.body.name,
          length: req.body.length,
          date: req.body.date,
          intensity: req.body.intensity,
          review: req.body.review
        });
      },
      function(err) {
        res.send(500, err.message);
      }
    );
});

router.delete('/:id', function(req, res) {
  Log
    .destroy({where: {id: req.params.id, owner: req.user.id}})
    .then(
      function(data) {
        res.send('you removed', req.params.id, 'log');
      },
      function(err) {
        res.send(500, err.message);
      }
    );
});

module.exports = router;