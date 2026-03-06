import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyOrders = () => {
  const { currency, backendUrl, axios, user } = useContext(AppContext);
  const [myOrders, setMyOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/order/my-orders");

      if (data.success) {
        setMyOrders(data.orders);
        toast.success(data.message);
      } else {
        console.log(error.message);
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(msg);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);
  return (
    <div className="py-16 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-10">My Orders</h1>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* EMPTY STATE */}
        {myOrders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              You have not placed any orders yet.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:scale-105 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="grid grid-cols-5 font-semibold text-gray-600 border-b pb-3">
              <div>Order ID</div>
              <div>Amount</div>
              <div>Payment</div>
              <div>Status</div>
              <div>Date</div>
            </div>

            {/* ORDERS */}
            {myOrders.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-5 items-center py-4 border-b hover:bg-gray-50 transition"
              >
                <p className="text-sm font-mono text-gray-500">
                  #{item._id.slice(-6).toUpperCase()}
                </p>

                <p className="font-bold">
                  {currency}
                  {item.totalAmount}
                </p>

                <p className="capitalize">{item.paymentMethod}</p>

                {/* STATUS BADGE */}
                <span
                  className={`px-3 py-1 text-white rounded-full text-sm w-fit
                    ${
                      item.status === "Delivered"
                        ? "bg-green-500"
                        : item.status === "Processing"
                        ? "bg-blue-500"
                        : item.status === "Shipped"
                        ? "bg-indigo-500"
                        : item.status === "Pending"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }
                  `}
                >
                  {item.status}
                </span>

                <p className="text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default MyOrders;
