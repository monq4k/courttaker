const SEQUELIZE = require("sequelize");
require("../database/connection");
module.exports = sequelize.define("company", {
      id: {
          type: SEQUELIZE.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: SEQUELIZE.STRING,
          allowNull: false
        },
        typeCompany: { //work, travel, entertainment
          type: SEQUELIZE.STRING,
          allowNull: false
        },
        password: {
          type: SEQUELIZE.STRING,
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