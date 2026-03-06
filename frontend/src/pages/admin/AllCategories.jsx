import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import { Edit } from "lucide-react";
import { useState } from "react";

const AllCategories = () => {
  const { categories, backendUrl, axios, fetchCategories } =
    useContext(AppContext);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openEditModal = (category) => {
    setEditingCategory(category);
    setNewName(category.name);
    setPreview(backendUrl + category.image);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingCategory(null);
    setNewName("");
    setNewImage(null);
    setPreview(null);
    setShowModal(false);
  };

  const handleUpdateCategory = (category) => {
    setEditingCategory(category);
    setNewName(category.name);
    setPreview(backendUrl + category.image);
  };

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/category/delete/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  const submitUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("name", newName);
      if (newImage) formData.append("image", newImage);

      const { data } = await axios.put(
        `${backendUrl}/api/category/update/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCategories();
        closeModal();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

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
          {categories?.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-3 items-center mb-4">
                <div>
                  <img
                    src={backendUrl + `${item.image}`}
                    className="w-20 h-20"
                    alt=""
                  />
                </div>
                <p>{item.name}</p>

                <div className="flex items-center gap-5">
                  <p
                    onClick={() => deleteCategory(item._id)}
                    className="text-red-500 cursor-pointer hover:underline"
                  >
                    <CircleX />
                  </p>
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-blue-500 hover:cursor-pointer"
                  >
                    <Edit />
                  </button>
                </div>
              </div>
              <hr className="text-gray-300" />
            </div>
          ))}
        </ul>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]  bg-opacity-10 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
              <h2 className="text-xl text-primary font-semibold mb-4">
                Edit Category
              </h2>

              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Category Name"
                className="w-full p-2 border rounded mb-3"
              />

              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setNewImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="mb-3"
              />

              {preview && (
                <img
                  src={preview}
                  alt=""
                  className="w-32 h-32 object-cover mb-3 mx-auto"
                />
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => submitUpdate(editingCategory._id)}
                  className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 cursor-pointer px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <hr className="my-2 w-full text-gray-200" /> */}
      </div>
    </div>
  );
};

export default AllCategories;
