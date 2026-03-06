const express = require("express");
const adminAuth = require("../middlewares/adminMiddleware");

const { statistics } = require("../controllers/dashboardController");

const dashboardRouter = express.Router();

dashboardRouter.get("/statistics", adminAuth, statistics);

module.exports = { dashboardRouter };
