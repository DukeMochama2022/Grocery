import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Product from "../components/Product";
import CallToAction from "../components/CallToAction";
import Blog from "../components/Blog";
import Brand from "../components/Brand";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div>
      <Hero />
      <Category />
      <Product />
      <CallToAction />
      <Blog />
      <Brand />
      <NewsLetter />
    </div>
  );
};

export default Home;
