import React from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const AddAddress = () => {
  const { navigate } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    country: "",
    zipCode: "",
    state: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Address added successifully !");
    navigate("/checkout")
  };
  return (
    <div
      className="py-12 bg-[#0B482F]"
      style={{ backgroundImage: `url(${assets.footer_img})` }}
    >
      <div>
        <form
          onSubmit={submitHandler}
          className="max-w-xl w-full mx-auto text-white p-4 border border-white rounded"
        >
          <div className="text-white flex flex-col gap-2 mb-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-white outline-none py-3 rounded p-2"
            />
          </div>

          <div className="text-white flex flex-col gap-2 mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-white outline-none py-3 rounded p-2"
            />
          </div>

          <div className="text-white flex flex-col gap-2 mb-4">
            <label htmlFor="city">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-white outline-none py-3 rounded p-2"
            />
          </div>
          <div className="text-white flex flex-col gap-2 mb-4">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              placeholder="Enter your country"
              required
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-white outline-none py-3 rounded p-2"
            />
          </div>
          <div className="text-white flex flex-col gap-2 mb-4">
            <label htmlFor="zipCode">Zip code</label>
            <input
              type="number"
              placeholder="Enter your country"
              required
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full border border-white outline-none py-3 rounded p-2"
            />
          </div>
          <div className="text-white flex flex-col gap-2 mb-4">
            <label htmlFor="state">State</label>
            <input
              type="text"
              placeholder="Enter your state"
              required
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-white outline-none py-3 rounded p-2"
            />
          </div>
          <button className="bg-primary w-full rounded-md text-white cursor-pointer px-6 py-2">Add Address</button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
