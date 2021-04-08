const SEQUELIZE = require("sequelize");
require("../database/connection");
module.exports = sequelize.define("companyRoomContract", {
      id: {
          type: SEQUELIZE.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        }
});