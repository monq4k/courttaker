const SEQUELIZE = require("sequelize");
require("../database/connection");
module.exports = sequelize.define("companyRoom", {
      id: {
          type: SEQUELIZE.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        numberOfUsers: { //work, travel, entertainment
          type: SEQUELIZE.INTEGER,
          allowNull: false
        },
        password: {
          type: SEQUELIZE.STRING,
          allowNull: false
        }
});