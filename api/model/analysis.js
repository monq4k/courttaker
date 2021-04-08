const SEQUELIZE = require("sequelize");
require("../database/connection");
module.exports = sequelize.define("analysis", {
      id: {
          type: SEQUELIZE.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        numberOfPeople: {
          type: SEQUELIZE.INTEGER,
          allowNull: false
        },
        result: {
          type: SEQUELIZE.STRING,
          allowNull: false
        }
});