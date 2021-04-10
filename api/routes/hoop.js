const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const HOOP_CONTROLLER = require("../controllers/court");
//get all companyRooms function
ROUTER.get("/", checkAuth, HOOP_CONTROLLER.getAll);
//get companyRoomInfoAboutOne function
ROUTER.get("/:id", checkAuth, HOOP_CONTROLLER.getOne);

ROUTER.post("/create", HOOP_CONTROLLER.create);
//update info companyRoom
ROUTER.post("/update/:id", checkAuth, HOOP_CONTROLLER.update);
//delete companyRoom function
ROUTER.delete("/:id", HOOP_CONTROLLER.delete);

module.exports = ROUTER;