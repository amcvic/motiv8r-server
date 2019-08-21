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
      review: req.body.review
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

router.get('/', function(req, res) {
  Log
    .findAll({where: {date: req.body.date}})
    .then(
      function(data) {
        res.json(data);
      },
      function(err) {
        res.send(500, err.message);
      }
    );
});

router.put('/', function(req, res) {
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
    .destroy({where: {id: req.params.id}})
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