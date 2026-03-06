import React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, backendUrl, axios, admin } = useContext(AppContext);
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/order/all-orders");

      if (data.success) {
        setAllOrders(data.orders);
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
    if (admin) {
      fetchAllOrders();
    }
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/order/update/${orderId}`,
        { status }
      );

      if (data.success) {
        toast.success(data.message);
        fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-10">Admin Order Management</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        {allOrders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No orders placed yet.
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="grid grid-cols-7 font-semibold text-gray-600 border-b pb-3">
              <div>Customer</div>
              <div>Email</div>
              <div>Address</div>
              <div>Amount</div>
              <div>Payment</div>
              <div>Status</div>
            </div>

            {/* ORDERS */}
            {allOrders.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-7 items-center py-4 border-b hover:bg-gray-50 transition"
              >
                <p className="font-semibold">{item.user?.name}</p>

                <p>{item.user?.email}</p>

                <p className="text-gray-600 ml-4 text-sm">
                  {item.address?.city}, {item.address?.country}
                </p>

                <p className="font-bold ml-4">
                  {currency}
                  {item.totalAmount}
                </p>

                <p className="capitalize">{item.paymentMethod}</p>

                {/* STATUS DROPDOWN */}
                <select
                  value={item.status}
                  onChange={(e) => updateStatus(item._id, e.target.value)}
                  className={`px-3 py-1 rounded-md text-white font-semibold outline-none
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
                  <option className="text-black">Pending</option>
                  <option className="text-black">Processing</option>
                  <option className="text-black">Shipped</option>
                  <option className="text-black">Delivered</option>
                  <option className="text-black">Cancelled</option>
                </select>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default Orders;
