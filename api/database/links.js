const SEQUELIZE = require("sequelize");
const USER = require("../model/user");
const COMPANY = require("../model/company");
const COMPANY_ROOM = require("../model/companyRoom");
const COMPANY_ROOM_CONTRACT = require("../model/companyRoomContract");
const ANALYSIS = require("../model/analysis");

module.exports = () => {
    USER.hasMany(COMPANY_ROOM_CONTRACT, { onDelete: "cascade", foreignKey: 'idUser'});
    COMPANY.hasMany(ANALYSIS, { onDelete: "cascade", foreignKey: 'idCompany'});
    COMPANY.hasMany(COMPANY_ROOM, { onDelete: "cascade", foreignKey: 'idCompany'});
    COMPANY_ROOM.hasMany(COMPANY_ROOM_CONTRACT, { onDelete: "cascade", foreignKey: 'idCompanyRoom'});
}