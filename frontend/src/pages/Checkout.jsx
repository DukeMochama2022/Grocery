import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const {
    cart,
    navigate,
    getCartTotal,
    currency,
    backendUrl,
    addresses,
    axios,
  } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const placeOrder = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/order/place", {
        items: cart.map((item) => ({
          product: item._id, // IMPORTANT
          quantity: item.quantity,
        })),
        address: selectedAddress,
        paymentMethod,
        totalAmount: getCartTotal(),
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-orders");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(msg);
    }
  };

  return (
    <div
      className="py-12 bg-[#0B482F]"
      style={{ backgroundImage: `url(${assets.footer_img})` }}
    >
      <h1 className="font-bold text-white text-center text-3xl">Checkout</h1>
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-6">
        <div>
          <h1 className=" my-5 text-3xl font-bold text-white text-center">
            Cart Summary
          </h1>
          <div className=" my-5 max-w-4xl w-full p-4 rounded-md border bg-white border-primary mb-8">
            {cart.map((item) => (
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={backendUrl + `${item.images?.[0]}`}
                    className="w-20 h-20 rounded-md"
                    alt=""
                  />
                  <p>{item.name}</p>
                </div>
                <p className="ml-2">
                  {currency}
                  {item.offerPrice}
                </p>
              </div>
            ))}
            <p className="mt-4">
              Total:{currency}
              {getCartTotal()}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 text-white">
          <h1 className="text-3xl font-bold">Order Summary</h1>
          <div className="flex flex-col gap-6">
            <label htmlFor="address">Select Address</label>
            <select
              className="w-full outline-none border border-primary p-2"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              <option className="text-gray-800">Select Address</option>
              {addresses?.map((addressItem) => (
                <option
                  key={addressItem._id}
                  value={addressItem._id}
                  className="text-gray-800"
                >
                  {addressItem.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => navigate("/add-address")}
              className="bg-primary rounded-md text-white cursor-pointer px-6 py-2"
            >
              Add New Address
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <label htmlFor="address">Select Payment Method</label>
            <select
              className="w-full outline-none border border-primary p-2"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value={"cod"} className="text-gray-800">
                COD
              </option>
              <option value={"online"} className="text-gray-800">
                ONLINE
              </option>
            </select>
          </div>
          <button
            type="submit"
            onClick={placeOrder}
            className="bg-primary rounded-md text-white cursor-pointer px-6 py-2"
          >
            {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
