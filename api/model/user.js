const SEQUELIZE = require("sequelize");
require("../database/connection");
module.exports = sequelize.define("user", {
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
        email: {
          type: SEQUELIZE.STRING,
          validate: {
            is: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          },
          allowNull: false
        },
        fullName: {
          type: SEQUELIZE.STRING,
          allowNull: false
        },
        temperament: {
          type: SEQUELIZE.STRING,
          allowNull: false
        },
        typeCharacter: {
          type: SEQUELIZE.STRING,
          allowNull: false
        }
});