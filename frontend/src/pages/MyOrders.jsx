import React from "react";
import { useContext } from "react";
import { myOrders } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const MyOrders = () => {
  const { currency } = useContext(AppContext);
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold"> My Orders</h1>
      <div className="border  border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-4 font-semibold text-gray-700">
          <div>Date</div>
          <div>Total Amount</div>
          <div>Payment Method</div>
          <div>Status</div>
        </div>
        <hr className="my-2 w-full text-gray-200" />
        <ul>
          {myOrders.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-4 items-center mb-4">
                <div>
                  <p>{item.date}</p>
                </div>

                <p className="font-bold">
                  {currency}
                  {item.totalAmount}
                </p>

                <p className="font-bold">{item.paymentMethod}</p>
                <p
                  className={`font-bold  text-white text-center
              ${item.status === "Delivered" ? "bg-green-600" : ""}
              ${item.status === "Processing" ? "bg-yellow-600" : ""}
              ${item.status === "Shipped" ? "bg-blue-600" : ""}
              ${item.status === "Cancelled" ? "bg-red-600" : ""}
              `}
                >
                  {item.status}
                </p>
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

export default MyOrders;
