const SEQUELIZE = require('sequelize');
require('../database/connection');
module.exports = sequelize.define('userCourt', {
  id: {
    type: SEQUELIZE.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});
