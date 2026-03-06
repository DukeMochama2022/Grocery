import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="mt-10 bg-[#155136] text-white"
      style={{ backgroundImage: `url(${assets.footer_img})` }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* GRID */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-10
          text-center
          sm:text-left
        ">
          
          {/* LOGO */}
          <div className="flex flex-col items-center sm:items-start">
            <img src={assets.logo} alt="logo" className="w-28 mb-3" />
            <p className="text-sm opacity-90">
              Farm Fresh • Affordable • Reliable
            </p>
          </div>

          {/* PAGES */}
          <div>
            <h1 className="text-xl font-semibold mb-3">Pages</h1>
            <div className="flex flex-col gap-2">
              <Link className="hover:text-gray-300 transition" to="/">Home</Link>
              <Link className="hover:text-gray-300 transition" to="/shop">Shop</Link>
              <Link className="hover:text-gray-300 transition" to="/about">About</Link>
              <Link className="hover:text-gray-300 transition" to="/contact">Contact</Link>
            </div>
          </div>

          {/* HELP */}
          <div>
            <h1 className="text-xl font-semibold mb-3">Help Center</h1>
            <div className="flex flex-col gap-2">
              <Link className="hover:text-gray-300 transition" to="">Payment</Link>
              <Link className="hover:text-gray-300 transition" to="">Shipping</Link>
              <Link className="hover:text-gray-300 transition" to="">Product Returns</Link>
              <Link className="hover:text-gray-300 transition" to="">Checkout</Link>
            </div>
          </div>

          {/* DOWNLOAD */}
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-xl font-semibold mb-3">Download App</h1>

            <img
              src={assets.app_store}
              alt="App store"
              className="w-36 mb-2 cursor-pointer hover:scale-105 transition"
            />

            <img
              src={assets.play_store}
              alt="Play store"
              className="w-36 cursor-pointer hover:scale-105 transition"
            />
          </div>

        </div>

        {/* BOTTOM LINE */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm opacity-80">
          © {new Date().getFullYear()} FarmFresh. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
