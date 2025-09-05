import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

const Product = () => {
  const { productsData, navigate } = useContext(AppContext);
  return (
    <div className="py-12">
      <div className="flex items-center">
        <h2 className="max-w-lg text-lg font-medium">
          Recently Arrived Products
        </h2>
        <div className="ml-1 w-20 flex border-b  border-secondary border-2"></div>
      </div>
      <h2 className="mt-4 text-secondary font-extrabold text-3xl">
        Pick Your Favourite One
      </h2>
      <div
        className="grid grid-cols-1 mt-6  sm:grid-cols-2 md:grid-cols-3
       lg:grid-cols-4 xl:grid-cols-4 items-center justify-center gap-4"
      >
        {productsData.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
