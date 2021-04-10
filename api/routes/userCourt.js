const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const USER_COURT_CONTROLLER = require("../controllers/court");
//get all companyRooms function
ROUTER.get("/", checkAuth, USER_COURT_CONTROLLER.getAll);
//get companyRoomInfoAboutOne function
ROUTER.get("/:id", checkAuth, USER_COURT_CONTROLLER.getOne);

ROUTER.post("/create", USER_COURT_CONTROLLER.create);
//update info companyRoom
ROUTER.post("/update/:id", checkAuth, USER_COURT_CONTROLLER.update);
//delete companyRoom function
ROUTER.delete("/:id", USER_COURT_CONTROLLER.delete);

module.exports = ROUTER;