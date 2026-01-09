import React from "react";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";

const Dashboard = () => {
  const data = [
    {
      title: "Total products",
      value: "2,847",
      icon: Package,
    },
    {
      title: "Total customers",
      value: "18,432",
      icon: Users,
    },
    {
      title: "Total orders",
      value: "9,857",
      icon: ShoppingCart,
    },
    {
      title: "Total Revenue",
      value: "$432,359",
      icon: DollarSign,
    },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
      </div>
      {/* Simple card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <Icon size={24} className="text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium text-gray-600">
                    {item.title}
                  </h3>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.value}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
