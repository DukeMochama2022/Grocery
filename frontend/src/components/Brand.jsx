import React from "react";
import { assets } from "../assets/assets";

const Brand = () => {
  const brands = [
    assets.brand_1,
    assets.brand_2,
    assets.brand_3,
    assets.brand_4,
    assets.brand_5,
  ];
  return (
    <div className="py-12">
      <div className="flex flex-wrap items-center justify-center gap-5">
        {brands.map((brand, index) => (
          <img
            src={brand}
            key={index}
            alt="brand"
            className="h-[200px] w-[200px] object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Brand;
