var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/signup', function (req, res) {

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    points: 0
  }).then(
    function createSuccess(user) {
      var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
      res.json({
        user: user,
        message: 'created',
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.post('/login', function(req, res) {
  User.findOne({where: {[sequelize.Op.or]: [{username: req.body.username}, {email: req.body.username}]}}).then(
    function(user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, matches) {
          if (matches) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
              user: user,
              message: 'successfully authenticated',
              sessionToken: token
            });
          } else {
            res.status(500).send({error: 'failed to authenticate'});
          }
        });
      } else {
        res.status(500).send({error: 'failed to authenticate'});
      }
    },
    function (err) {
      res.status(501).send({error: 'user not found'});
    }
  );
});

router.get('/:id', function(req, res) {
  User.findOne({where: {id: req.params.id}}).then(
    function(user) {
      if (user) {
        res.json({
          user: user
        });
      } else {
        res.status(500).send({error: 'user not found'});
      }
    },
    function (err) {
      res.status(501).send({error: 'user not found'});
    }
  );
});

router.delete('/:id', function(req, res) {
  User.destroy({
    where: {id: req.params.id}
  }).then(
    () => {
      res.json({
        message: 'user with id ' + req.params.id + ' has been deleted'
      });
    },
    (error) => {
      res.status(500).send({error: 'error deleting '+error})
    }
  );
})

router.get('/', function(req, res) {
  User.findAll().then(
    function(users) {
      res.json(users);
    },
    function (err) {
      res.status(500).send({error: 'no users!'});
    }
  );
});

router.put('/addPoint/:id', function(req,res) {
  User.increment([
    'points'
  ], {by: req.body.points, where: {id: req.params.id}}).then(
    function(data) {
      res.json(data);
    }, 
    function(err) {
      res.status(500).send({error: 'points not incremented'});
    }
  );
});

module.exports = router;