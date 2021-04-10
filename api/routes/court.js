const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const COURT_CONTROLLER = require("../controllers/court");
//get all companyRooms function
ROUTER.get("/", checkAuth, COURT_CONTROLLER.getAll);
//get companyRoomInfoAboutOne function
ROUTER.get("/:id", checkAuth, COURT_CONTROLLER.getOne);

ROUTER.post("/create", COURT_CONTROLLER.create);
//update info companyRoom
ROUTER.post("/update/:id", checkAuth, COURT_CONTROLLER.update);
//delete companyRoom function
ROUTER.delete("/:id", COURT_CONTROLLER.delete);

module.exports = ROUTER;