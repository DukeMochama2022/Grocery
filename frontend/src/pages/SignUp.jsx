import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SignUp = () => {
  const { navigate } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("SignUp successful!");
    navigate("/");
  };
  return (
    <div
      className="py-12 h-screen bg-[#0B482F]"
      style={{ backgroundImage: `url(${assets.footer_img})` }}
    >
      <div>
        <h1 className="text-4xl text-white font-bold text-center mb-8 capitalize ">
          Signup to continue.
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto text-white p-4 border  border-white rounded"
        >
          <div className="flex flex-col mb-4 gap-2 text-white">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter  your username"
              required
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full outline-none  border border-white  py-3 p-2 rounded"
            />

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
            Sign Up
          </button>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary underline">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
