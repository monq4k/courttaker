const SEQUELIZE = require("sequelize");
require("../database/connection");
module.exports = sequelize.define("admin", {
      id: {
          type: SEQUELIZE.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        password: {
          type: SEQUELIZE.STRING,
          allowNull: false
        },
        adminKey: {
            type: SEQUELIZE.STRING,
            defaultValue: "1",
            allowNull: false
          },
        email: {
          type: SEQUELIZE.STRING,
          validate: {
            is: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          },
          allowNull: false
        }
});