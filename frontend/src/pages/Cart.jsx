import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { CircleX } from "lucide-react";

const Cart = () => {
  const { cart, currency, navigate, deleteFromCart, getCartTotal } =
    useContext(AppContext);
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold"> My Cart</h1>
      <div className="border  border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-5 font-semibold text-gray-700">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
          <div>Actions</div>
        </div>
        <hr className="my-2 w-full text-gray-200" />
        <ul>
          {cart.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-5 items-center mb-4">
                <div>
                  <img src={item.images[0]} className="w-20 h-20" alt="" />
                  <p>{item.name}</p>
                </div>

                <p className="font-bold">
                  {currency}
                  {item.offerPrice}
                </p>
                <p>{item.quantity}</p>
                <p>
                  {currency}
                  {item.quantity * item.offerPrice}
                </p>
                <p
                  onClick={() => deleteFromCart(item._id)}
                  className="text-red-500 cursor-pointer hover:underline"
                >
                  <CircleX />
                </p>
              </div>
              <hr className="text-gray-300" />
            </div>
          ))}
        </ul>
        {/* <hr className="my-2 w-full text-gray-200" /> */}
        <div>
          <div className="flex mt-5 items-center justify-between ">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">
              {currency}
              {getCartTotal()}
            </p>
          </div>
          <div className="flex mt-5 items-center justify-center">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-secondary py-2 px-3 rounded-lg uppercase w-full text-white hover:bg-primary cursor-pointer"
            >
              Procceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
