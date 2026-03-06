const express = require("express");
const {
  signup,
  login,
  logout,
  isAuthenticated,
} = require("../controllers/authController");
const userAuth  = require("../middlewares/authMiddleware");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", userAuth, logout);
authRouter.get("/is-auth", userAuth, isAuthenticated);

module.exports = { authRouter };
