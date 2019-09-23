const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
});

sequelize.users = require('./models/user.js')(sequelize, Sequelize);
sequelize.meetups = require('./models/meetup.js')(sequelize, Sequelize);
sequelize.logs = require('./models/log.js')(sequelize, Sequelize);

sequelize.users.hasMany(sequelize.meetups);
sequelize.users.hasMany(sequelize.logs);

sequelize.authenticate().then(
  function() {
    console.log('Connected to motiv8r postgres database');
  },
  function(err) {
    console.log(err);
  }
);

module.exports = sequelize;