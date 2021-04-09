const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const COMPANY = require("../model/company");
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const COMPANY_CONTROLLER = require("../controllers/hoop");
//get all companies function
ROUTER.get("/", checkAuth, COMPANY_CONTROLLER.companyGetALL);

ROUTER.get("/getRooms/:id", checkAuth, COMPANY_CONTROLLER.companyGetCompanyRooms);
//get companyInfoAboutOne function
ROUTER.get("/:id", checkAuth, COMPANY_CONTROLLER.companyGetInfoAboutOne);
//create company function
ROUTER.post("/signup", COMPANY_CONTROLLER.companySignUp);
//update info company
ROUTER.post("/update/:id", checkAuth, COMPANY_CONTROLLER.companyUpdateInfoAboutOne);
//login company function
ROUTER.post("/login", jsonParser, COMPANY_CONTROLLER.companyLogin);
//delete company function
ROUTER.delete("/:id", COMPANY_CONTROLLER.companyDeleteOne);

module.exports = ROUTER;