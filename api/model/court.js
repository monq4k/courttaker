const SEQUELIZE = require('sequelize');
require('../database/connection');
module.exports = sequelize.define('court', {
  id: {
    type: SEQUELIZE.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  address: {
    type: SEQUELIZE.STRING,
    allowNull: false,
  },
});