import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { navigate, setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Login successful");
    setUser(true);
    navigate("/");
  };
  return (
    <div
      className="py-12 h-screen bg-[#0B482F]"
      style={{ backgroundImage: `url(${assets.footer_img})` }}
    >
      <div>
        <h1 className="text-4xl text-white font-bold text-center mb-8 capitalize ">
          Login To Your Account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto text-white p-4 border  border-white rounded"
        >
          <div className="flex flex-col mb-4 gap-2 text-white">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter  your Email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none  border border-white  py-3 p-2 rounded"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter  your Password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none  border border-white  py-3 p-2 rounded"
            />
          </div>
          <button className="bg-primary text-white  cursor-pointer w-full py-3 rounded">
            Login
          </button>
          <p className="mt-3 text-center">
            Dont have an account?{" "}
            <Link to={"/signup"} className="text-primary underline">
              Signup
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
