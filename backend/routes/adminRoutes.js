const express = require("express");
const {
  adminLogin,
  adminLogout,
  checkAdmin,
} = require("../controllers/adminController");
const isAdmin = require("../middlewares/adminMiddleware");


const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/logout", adminLogout);
adminRouter.get("/is-admin", isAdmin, checkAdmin);

module.exports = { adminRouter };
