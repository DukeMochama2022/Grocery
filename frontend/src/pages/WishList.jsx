import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { BadgePlusIcon, CircleX } from "lucide-react";
import { ShoppingBasket } from "lucide-react";

const WishList = () => {
  const { favourite, removeFromFavourite, addToCart, currency } =
    useContext(AppContext);
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold"> My Favourites</h1>
      <div className="border  border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-3 font-semibold text-gray-700">
          <div>Product</div>
          <div>Price</div>
          <div>Actions</div>
        </div>
        <hr className="my-2 w-full text-gray-200" />
        <ul>
          {favourite.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-3 items-center mb-4">
                <div>
                  <img src={item.images[0]} className="w-20 h-20" alt="" />
                  <p>{item.name}</p>
                </div>

                <p className="font-bold">
                  {currency}
                  {item.offerPrice}
                </p>
                <div className="flex items-center gap-5">
                  <p
                    onClick={() => removeFromFavourite(item._id)}
                    className="text-red-500 cursor-pointer hover:underline"
                  >
                    <CircleX />
                  </p>

                  <p
                    onClick={() => addToCart(item)}
                    className="text-green-500 cursor-pointer hover:underline"
                  >
                    <BadgePlusIcon />
                  </p>
                </div>
              </div>
              <hr className="text-gray-300" />
            </div>
          ))}
        </ul>
        {/* <hr className="my-2 w-full text-gray-200" /> */}
      </div>
    </div>
  );
};

export default WishList;
