import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="py-12 mt-4 bg-[#155136] "
      style={{ backgroundImage: `url(${assets.footer_img})` }}
    >
      <div className="flex flex-wrap items-center justify-center gap-10 ">
        <div>
          <img src={assets.logo} alt="" className="w-32 h-32 " />
          <h3 className="text-white max-w-lg text-center px-4">
            Farm Fresh • Affordable • Reliable
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center text-white">
          <h1 className="text-2xl font-semibold">Pages</h1>
          <Link to={"/"}>Home</Link>
          <Link to={"/shop"}>Shop</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </div>

        <div className="flex flex-col justify-center items-center text-white">
          <h1 className="text-2xl font-semibold">Help Center</h1>
          <Link to={""}>Payment</Link>
          <Link to={""}>Shipping</Link>
          <Link to={""}>Product Returns</Link>
          <Link to={""}>CheckOut</Link>
        </div>

        <div className="flex flex-col justify-center items-center text-white">
          <h1 className="text-2xl font-semibold">Pages</h1>
          <Link to={"/"}>Home</Link>
          <Link to={"/shop"}>Shop</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </div>

        <div className="flex flex-col justify-center items-center text-white">
          <h1 className="text-2xl font-semibold">Download App</h1>
          <div className="flex items-center mt-2 cursor-pointer">
            <img src={assets.app_store} alt="" />
          </div>
          <div className="flex items-center mt-2 cursor-pointer">
            <img src={assets.play_store} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
