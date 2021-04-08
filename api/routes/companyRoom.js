const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const COMPANY_ROOM = require("../model/companyRoom");
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const COMPANY_ROOM_CONTROLLER = require("../controllers/companyRoom");
//get all companyRooms function
ROUTER.get("/", checkAuth, COMPANY_ROOM_CONTROLLER.companyRoomGetALL);
//get companyRoomInfoAboutOne function
ROUTER.get("/:id", checkAuth, COMPANY_ROOM_CONTROLLER.companyRoomGetInfoAboutOne);

ROUTER.get("/getUsers/:id", checkAuth, COMPANY_ROOM_CONTROLLER.companyRoomGetUsers);
//create companyRoom function
ROUTER.post("/create", COMPANY_ROOM_CONTROLLER.companyRoomCreate);
//update info companyRoom
ROUTER.post("/update/:id", checkAuth, COMPANY_ROOM_CONTROLLER.companyRoomUpdateInfoAboutOne);
//delete companyRoom function
ROUTER.delete("/:id", COMPANY_ROOM_CONTROLLER.companyRoomDeleteOne);

module.exports = ROUTER;