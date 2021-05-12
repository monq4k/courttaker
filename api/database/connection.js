const SEQUELIZE_MODULE = require("sequelize");
const SEQUELIZE_CONNECTION_TEMP = new SEQUELIZE_MODULE("heroku_7a5460cfea7c50e", "b6007430ce8fa0", "a40e6250", {
  dialect: "mysql",
  host: "us-cdbr-east-03.cleardb.com",
  define: {
    timestamps: false
  }
});
SEQUELIZE_CONNECTION_TEMP.sync({force: true}).then(console.log("Synchronize")).catch((err) => {
  console.log(err);
});
module.exports = SEQUELIZE_CONNECTION_TEMP;
global.sequelize = SEQUELIZE_CONNECTION_TEMP;
//mysql://b6007430ce8fa0:a40e6250@us-cdbr-east-03.cleardb.com/heroku_7a5460cfea7c50e?reconnect=true