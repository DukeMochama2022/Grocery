const User = require("../models/User");
const Address = require("../models/Address");

// Create address
const createAddress = async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      user: req.user.id, // assumes auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Address added successifully.",
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserAddresses = async (req, res) => {
    try {
      const addresses = await Address.find({ user: req.user.id });
  
      res.status(200).json({
        success: true,
        addresses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  

module.exports = { createAddress,getUserAddresses };
