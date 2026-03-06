const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
    console.log("Database connection successiful !");
  } catch (error) {
    console.log(error);
  }
};

module.exports=connectDB