const SEQUELIZE = require('sequelize');
require('../database/connection');
module.exports = sequelize.define('hoop', {
  id: {
    type: SEQUELIZE.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  netType: {
    type: SEQUELIZE.STRING,
    allowNull: false,
  },
  height: {
    type: SEQUELIZE.INTEGER,
    allowNull: false,
  },
  width: {
    type: SEQUELIZE.INTEGER,
    allowNull: false,
  },
});
