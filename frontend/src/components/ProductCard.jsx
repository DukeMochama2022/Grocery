import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, backendUrl } = useContext(AppContext);
  return (
    <div
      className="w-[250px] h-[350px] rounded-xl b-[#FAFAFA] p-[20px] border-1 border-amber-300 hover:border hover:border-secondary hover:transform 
    hover:scale-105 transition-all ease-in-out duration-300"
    >
      <div className="flex justify-between gap-4">
        <p className="font-bold text-primary">{product.weight}</p>
      </div>
      <div className="cursor-pointer">
        <Link to={`/product/${product._id}`} className="cursor-pointer">
          <img src={backendUrl + `${product.images[0]}`} alt="" />
        </Link>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="flex items-center justify-center rounded mb-3 w-full py-1 bg-secondary mt-3 text-white cursor-pointer"
      >
        <ShoppingCart />
      </button>
      <hr className="w-full" />
      <div>
        <p className="text-secondary text-sm font-normal">
          {product.category?.name}
        </p>
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-base font-normal line-through text-gray-400">
          {currency}
          {product.price}
        </p>
        <p className="text-base font-normal ">
          {currency}
          {product.offerPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
