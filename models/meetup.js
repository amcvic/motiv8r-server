module.exports = function (sequelize, DataTypes) {
  return sequelize.define('meetup', {
    date: DataTypes.DATE,
    locationX: DataTypes.FLOAT,
    locationY: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    attendees: DataTypes.ARRAY(DataTypes.INTEGER),
    prereqs: DataTypes.ARRAY(DataTypes.STRING),
    owner: DataTypes.INTEGER
  });
}