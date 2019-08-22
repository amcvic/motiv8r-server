module.exports = function (sequelize, DataTypes) {
  return sequelize.define('log', {
    name: DataTypes.STRING,
    length: DataTypes.FLOAT,
    date: DataTypes.DATE,
    intensity: DataTypes.INTEGER,
    review: DataTypes.STRING,
    owner: DataTypes.INTEGER
  });
}