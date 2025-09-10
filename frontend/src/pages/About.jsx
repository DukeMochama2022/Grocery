import React from "react";
import { assets } from "../assets/assets";
import Brand from "../components/Brand"

const About = () => {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-secondary text-center">
        About Our Farm & Farmers
      </h1>
      <p className="text-lg mt-4 text-center max-w-4xl mx-auto">
        We are a community-driven farm dedicated to bringing you the freshest,
        healthiest, and most affordable groceries straight from our fields to
        your table. Our farmers work with care and passion, using sustainable
        practices that protect the environment while ensuring top-quality
        produce. From crisp vegetables and juicy fruits to farm-fresh grains and
        herbs, everything we grow is harvested with love and delivered with
        trust. By shopping with us, you are not only enjoying healthy food but
        also supporting local farmers and families.
      </p>
      <div className="flex flex-col md:flex-row  px-10 items-center justify-around mt-12 bg-black text-white">
        <div>
          <img src={assets.about_hero} className="w-full md:w-1/2" alt="" />
        </div>
        <div className="flex flex-col gap-3 p-3">
          <h1 className="text-3xl font-bold">Deal of the day</h1>
          <p className="">
            Grab today’s special offer and enjoy fresh produce at unbeatable
            prices!
          </p>
          <button className="bg-secondary cursor-pointer hover:bg-primary text-white px-4 py-2">Shop</button>
        </div>
      </div>
      <Brand/>
    </div>
  );
};

export default About;
