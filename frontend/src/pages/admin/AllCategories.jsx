import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { CircleX } from "lucide-react";

const AllCategories = () => {
  const {categoriesData}=useContext(AppContext)
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">All Categories</h1>
      <div className=" mt-4 border  border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-3 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Actions</div>
        </div>
        <hr className="my-2 w-full text-gray-200" />
        <ul>
          {categoriesData.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-3 items-center mb-4">
                <div>
                  <img src={item.image} className="w-20 h-20" alt="" />
                </div>
                <p>{item.name}</p>

                <div className="flex items-center gap-5">
                  <p
                    onClick={""}
                    className="text-red-500 cursor-pointer hover:underline"
                  >
                    <CircleX />
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
  )
}

export default AllCategories
