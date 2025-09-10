import React from "react";
import { motion } from "motion/react";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Blog = () => {
  const { blogsData } = useContext(AppContext);
  return (
    <div className="py-12">
      <div className="flex items-center">
        <h2 className="max-w-lg text-lg font-medium">Blogs</h2>
        <div className="ml-1 w-20 flex border-b  border-secondary border-2"></div>
      </div>
      <h2 className="mt-4 text-secondary font-extrabold text-3xl">
        Find Out Interesting Blogs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
        {blogsData.map((blog) => (
          <div key={blog._id}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              <img src={blog.image} className="w-full rounded-2xl" alt="" />
            </motion.div>
            <div className="flex items-center my-4">
              <h2 className="max-w-lg text-lg font-semibold">{blog.date}</h2>
              <div className="border-secondary ml-1 w-20 flex border-b border-2"></div>
            </div>
            <h1 className="text-xl font-bold">{blog.title}</h1>
            <p className="text-sm font-normal">{blog.desc}</p>
            <button className="bg-secondary text-white px-6 py-2 mt-5 cursor-pointer hover:bg-primary">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
