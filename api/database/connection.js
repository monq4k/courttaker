const SEQUELIZE_MODULE = require("sequelize");
const SEQUELIZE_CONNECTION_TEMP = new SEQUELIZE_MODULE("heroku_130b38977045743", "b4a029dec09a6b", "61c017d8", {
  dialect: "mysql",
  host: "eu-cdbr-west-03.cleardb.net",
  define: {
    timestamps: false
  }
});
SEQUELIZE_CONNECTION_TEMP.sync().then(console.log("Synchronize")).catch((err) => {
  console.log(err);
});
module.exports = SEQUELIZE_CONNECTION_TEMP;
global.sequelize = SEQUELIZE_CONNECTION_TEMP;
//mysql://b4a029dec09a6b:61c017d8@eu-cdbr-west-03.cleardb.net/heroku_130b38977045743?reconnect=true