import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const { products, navigate } = useContext(AppContext);
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = () => {
    const query = input.toLowerCase().trim();
    if (query ==="") {
      setFilteredProducts(products);
    } else {
      const result = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(result);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [input, products]);
  return (
    <div className="py-12 px-4 md:px-8 lg:px-16">
      <div className="flex items-center justify-center mt-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-10 py-3 rounded-l-full outline-none border border-secondary"
          placeholder="Search for products"
        />
        <button className="hidden rounded-r-full  md:flex px-10 py-[13px] bg-primary text-white cursor-pointer ">
          Search
        </button>
      </div>
      <h1 className="mt-4 text-secondary font-extrabold text-3xl">
        Explore All Products
      </h1>
      <div
        className="grid grid-cols-1 mt-6  sm:grid-cols-2 md:grid-cols-3
       lg:grid-cols-4 xl:grid-cols-4 items-center justify-center gap-4"
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
