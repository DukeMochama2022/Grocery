const express = require("express");
const addressRouter = express.Router();
const userAuth  = require("../middlewares/authMiddleware");

const {
    createAddress,
    getUserAddresses,
  } = require("../controllers/addressController");

  addressRouter.post("/add", userAuth, createAddress);
  addressRouter.get("/get", userAuth, getUserAddresses);

module.exports = {addressRouter};