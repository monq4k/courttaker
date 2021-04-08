const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const ANALYSIS = require("../model/analysis");
const checkAuth = require("../middleware/check-auth");
const jsonParser = EXPRESS.json();

const ANALYSIS_CONTROLLER = require("../controllers/analysis");

ROUTER.get("/", checkAuth, ANALYSIS_CONTROLLER.analysisGetALL);

ROUTER.get("/:id", checkAuth, ANALYSIS_CONTROLLER.analysisGetInfoAboutOne);

ROUTER.post("/analyse", ANALYSIS_CONTROLLER.analysisCreateAndAnalyse);

ROUTER.post("/update/:id", checkAuth, ANALYSIS_CONTROLLER.analysisUpdateInfoAboutOne);

ROUTER.delete("/:id", ANALYSIS_CONTROLLER.analysisDeleteOne);

module.exports = ROUTER;