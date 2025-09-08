import React from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const CallToAction = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#FDF5F1] flex  flexc-col md:flex-row gap-5 items-center justify-between p-4 rounded-2xl"
        >
          <div className="flex flex-col gap-3">
            <h1 className=" text-primary text-2xl font-bold uppercase">
              Healthy Organic Fruits.
            </h1>
            <h2 className="text-2xl font-semibold text-secondary">
              Get 20% Flat Off
            </h2>
            <button className="py-5 px-3  bg-secondary text-white hover:bg-primary transition ease-in-out duration-300 cursor-pointer">
              View all items
            </button>
          </div>
          <img src={assets.organic_fruits} alt="" className="w-1/2" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#EEF9FC] flex  flexc-col md:flex-row gap-5 items-center justify-between p-4 rounded-2xl"
        >
          <div className="flex flex-col gap-3">
            <h1 className=" text-primary text-2xl font-bold uppercase">
              Get 10% Flat Offer On.
            </h1>
            <h2 className="text-2xl font-semibold text-secondary">
              Fresh Organic vegetables.
            </h2>
            <button className="py-5 px-3  bg-secondary text-white hover:bg-primary transition ease-in-out duration-300 cursor-pointer">
              View all items
            </button>
          </div>
          <img src={assets.organic_fruits} alt="" className="w-1/2" />
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
