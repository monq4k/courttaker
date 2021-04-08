const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const USER = require("../model/user");
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const USER_CONTROLLER = require("../controllers/user");
//get all users function
ROUTER.get("/", checkAuth, USER_CONTROLLER.userGetAll);
//get userInfo function
ROUTER.get("/:id", checkAuth, USER_CONTROLLER.userGetInfoAboutOne);
//create user function
ROUTER.post("/signup", USER_CONTROLLER.userSignUp);
//update info user
ROUTER.post("/update/:id", checkAuth, USER_CONTROLLER.userUpdateInfo);
//login user function
ROUTER.post("/login", jsonParser, USER_CONTROLLER.userLogin);
//delete user function
ROUTER.delete("/:id", USER_CONTROLLER.userDeleteOne);

module.exports = ROUTER;