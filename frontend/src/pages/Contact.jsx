import React from "react";
import { User, Mail, MapPin, Phone, Building2, Clock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for Contacting us! we will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <div className="py-12 ">
      <div className=" mx-auto flex flex-col md:flex-row gap-12 px-6">
        {/* Contact Form */}
        <div className="md:w-1/2 bg-gray-50 shadow-md rounded-lg p-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-sm text-slate-800"
          >
            <p className="text-xs bg-secondary text-white font-medium px-3 py-1 rounded-full w-max">
              Send Message
            </p>
            <h1 className="text-4xl font-bold py-4 text-center md:text-left">
              Let’s Get In Touch.
            </h1>

            <div className="w-full">
              {/* Full Name */}
              <label htmlFor="name" className="font-medium">
                Full Name
              </label>
              <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-secondary transition-all">
                <User className="text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-full px-2 w-full outline-none bg-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <label htmlFor="email-address" className="font-medium mt-4">
                Email Address
              </label>
              <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-secondary transition-all">
                <Mail className="text-slate-500 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-full px-2 w-full outline-none bg-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Message */}
              <label htmlFor="message" className="font-medium mt-4">
                Message
              </label>
              <div className="flex items-start mt-2 mb-4 gap-2 border border-slate-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-secondary transition-all">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full resize-none outline-none bg-transparent"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center cursor-pointer gap-1 mt-5 bg-secondary hover:bg-primary text-white py-2.5 w-full rounded-full transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Office Info */}
        <div className="md:w-1/2 bg-gray-50 shadow-md rounded-lg p-6">
          <p className="text-xs bg-secondary text-white font-medium px-3 py-1 rounded-full w-max">
            Contact Us
          </p>
          <h2 className="text-2xl mt-4 font-bold mb-6">Our Office</h2>
          <ul className="space-y-5 text-slate-700">
            <li className="flex items-start gap-3">
              <MapPin className="text-primary w-6 h-6 mt-1" />
              <p>
                <span className="font-medium">Address:</span> <br />
                400-200 Fresh Market Street, Nairobi, Kenya
              </p>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="text-primary w-6 h-6 mt-1" />
              <p>
                <span className="font-medium">Phone:</span> <br />
                +254 112 197 987
              </p>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="text-primary w-6 h-6 mt-1" />
              <p>
                <span className="font-medium">Email:</span> <br />
                support@groceryshop.com
              </p>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="text-primary w-6 h-6 mt-1" />
              <p>
                <span className="font-medium">Office Hours:</span> <br />
                Mon - Fri, 8:00 AM - 6:00 PM
              </p>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="text-primary w-6 h-6 mt-1" />
              <p>
                <span className="font-medium">Support:</span> <br />
                24/7 Online Assistance
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
