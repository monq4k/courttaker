const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const COMPANY_ROOM_CONTRACTS = require("../model/companyRoomContract");
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const COMPANY_ROOM_CONTRACTS_CONTROLLER = require("../controllers/companyRoomContract");
//get all companyRoomContracts function
ROUTER.get("/", checkAuth, COMPANY_ROOM_CONTRACTS_CONTROLLER.companyRoomContractGetALL);
//get companyRoomInfoAboutOne function
ROUTER.get("/:id", checkAuth, COMPANY_ROOM_CONTRACTS_CONTROLLER.companyRoomContractsGetInfoAboutOne);
//create companyRoomContract function
ROUTER.post("/create", COMPANY_ROOM_CONTRACTS_CONTROLLER.companyRoomContractCreate);
//delete companyRoomContract function
ROUTER.delete("/:id", COMPANY_ROOM_CONTRACTS_CONTROLLER.companyRoomContractDeleteOne);

module.exports = ROUTER;