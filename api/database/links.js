const SEQUELIZE = require("sequelize");
const USER = require("../model/user");
const COURT = require("../model/court");
const USER_COURT = require("../model/userCourt");
const COURT_OWNER = require("../model/courtOwner");
const HOOP = require("../model/hoop");
const TEAM = require("../model/team");

module.exports = () => {
    USER.hasMany(USER_COURT, { onDelete: "cascade", foreignKey: 'idUser'});
    COURT.hasMany(USER_COURT, { onDelete: "cascade", foreignKey: 'idCourt'});
    TEAM.hasMany(USER, { onDelete: "cascade", foreignKey: 'idTeam'});
    COURT.hasMany(HOOP, { onDelete: "cascade", foreignKey: 'idCourt'});
    COURT_OWNER.hasMany(COURT, { onDelete: "cascade", foreignKey: 'idCourtOwner'});
}