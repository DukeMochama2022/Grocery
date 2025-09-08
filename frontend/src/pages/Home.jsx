import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Product from "../components/Product";
import CallToAction from "../components/CallToAction";
import Blog from "../components/Blog";

const Home = () => {
  return (
    <div>
      <Hero />
      <Category />
      <Product />
      <CallToAction />
      <Blog/>
    </div>
  );
};

export default Home;
