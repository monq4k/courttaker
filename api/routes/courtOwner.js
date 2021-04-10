const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const COURT_OWNER_CONTROLLER = require("../controllers/courtOwner");
//get all users function
ROUTER.get("/", checkAuth, COURT_OWNER_CONTROLLER.getAll);
//get userInfo function
ROUTER.get("/:id", checkAuth, COURT_OWNER_CONTROLLER.getOne);
//create user function
ROUTER.post("/signup", COURT_OWNER_CONTROLLER.signUp);
//update info user
ROUTER.post("/update/:id", checkAuth, COURT_OWNER_CONTROLLER.update);
//login user function
ROUTER.post("/login", jsonParser, COURT_OWNER_CONTROLLER.login);
//delete user function
ROUTER.delete("/:id", COURT_OWNER_CONTROLLER.delete);

module.exports = ROUTER;