import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

import { Heart, ShoppingCart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const { navigate, user, setUser } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-secondary border-b border-primary"
      : "";
  };

  const logout = () => {
    setUser(null);
    toast.success("Logout successful");
    navigate("/");
  };
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link>
        <img
          src={assets.grocery_logo}
          alt=""
          className="w-15 h-15 rounded-xl"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"} className={isActive("/")}>
          Home
        </Link>
        <Link to={"/shop"} className={isActive("/shop")}>
          Shop
        </Link>
        <Link to={"/about"} className={isActive("/about")}>
          About
        </Link>
        <Link to={"/contact"} className={isActive("/contact")}>
          Contact
        </Link>

        <div className="relative cursor-pointer">
          <ShoppingCart className="w-5 h-5" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            3
          </button>
        </div>

        <div className="relative cursor-pointer">
          <Heart className="w-5 h-5" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            5
          </button>
        </div>

        {user ? (
          <div className="relative group">
            <img
              src={assets.image1}
              alt=""
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div
              className="absolute right-0 mt-2 w-40 bg-secondary  shadow-lg rounded-lg  opacity-0 
            group-hover:opacity-100 group-hover:visible invisible transition duration-300 z-50"
            >
              <ul className="text-white">
                <p
                  onClick={() => navigate("/my-orders")}
                  className="cursor-pointer px-3 py-1 hover:bg-primary "
                >
                  My orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer px-3 py-1 hover:bg-primary "
                >
                  Logout
                </p>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-secondary transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 z-50 px-5 text-sm md:hidden`}
      >
        <Link to={"/"} onClick={() => setOpen(false)} className={isActive("/")}>
          Home
        </Link>
        <Link
          to={"/shop"}
          onClick={() => setOpen(false)}
          className={isActive("/shop")}
        >
          Shop
        </Link>
        <Link
          to={"/about"}
          onClick={() => setOpen(false)}
          className={isActive("/about")}
        >
          About
        </Link>
        <Link
          to={"/contact"}
          onClick={() => setOpen(false)}
          className={isActive("/contact")}
        >
          Contact
        </Link>
        {user ? (
          <div className="relative group">
            <img
              src={assets.image1}
              alt=""
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div
              className="absolute right-0 mt-2 w-40 bg-secondary  shadow-lg rounded-lg  opacity-0 
            group-hover:opacity-100 group-hover:visible invisible transition duration-300 z-50"
            >
              <ul className="text-white">
                <p
                  onClick={() => navigate("/my-orders")}
                  className="cursor-pointer px-3 py-1 hover:bg-primary "
                >
                  My orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer px-3 py-1 hover:bg-primary "
                >
                  Logout
                </p>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-secondary transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
