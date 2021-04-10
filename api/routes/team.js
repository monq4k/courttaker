const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const TEAM_CONTROLLER = require("../controllers/team");
//get all companyRooms function
ROUTER.get("/", checkAuth, TEAM_CONTROLLER.getAll);
//get companyRoomInfoAboutOne function
ROUTER.get("/:id", checkAuth, TEAM_CONTROLLER.getOne);

ROUTER.post("/create", TEAM_CONTROLLER.create);
//update info companyRoom
ROUTER.post("/update/:id", checkAuth, TEAM_CONTROLLER.update);
//delete companyRoom function
ROUTER.delete("/:id", TEAM_CONTROLLER.delete);

module.exports = ROUTER;