const SEQUELIZE = require('sequelize');
require('../database/connection');
module.exports = sequelize.define('team', {
  id: {
    type: SEQUELIZE.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: SEQUELIZE.STRING,
    allowNull: false,
  },
  countUsers: {
    type: SEQUELIZE.INTEGER,
    allowNull: false,
  },
  dateOfCreation: {
    type: SEQUELIZE.STRING,
    allowNull: false,
  },
  image: {
    type: SEQUELIZE.BLOB,
    allowNull: false,
  },
  hoursPlayed: {
    type: SEQUELIZE.INTEGER,
    allowNull: false,
  },
});
