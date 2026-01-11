import { Upload } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AddProduct = () => {
  const { navigate, categoriesData, loading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    offerPrice: "",
    smallDesc: "",
    longDesc: "",
    weight: "",
    category: "",
    images: [],
  });

  const [previews, setPreviews] = useState([null, null, null, null]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...formData.images];
      updatedImages[index] = file;

      const updatedPreviews = [...previews];
      updatedPreviews[index] = URL.createObjectURL(file);

      setFormData({ ...formData, images: updatedImages });
      setPreviews(updatedPreviews);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/products");
    toast.success("Product added successfully.");
  };

  return (
    <div className="py-12">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full flex flex-col">
        {/* name */}
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
             focus:ring-secondary focus:border-transparent"
            placeholder="Enter your name..."
          />
          {/* price and Offer Price */}
          <div className="grid mt-4 grid-cols-2 gap-5">
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                 focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="e.g 10.99"
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Offer Price
              </label>
              <input
                type="number"
                name="offerPrice"
                value={formData.offerPrice}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                 focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="e.g 15.99"
              />
            </div>
          </div>

          {/* short description */}
          <div>
            <label
              htmlFor=""
              className="block mt-4 text-sm font-medium text-gray-700 mb-2"
            >
              Small Description
            </label>
            <input
              type="text"
              name="smallDesc"
              value={formData.smallDesc}
              onChange={handleChange}
              required
              placeholder="Enter small Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary 
              focus:border-transparent "
            />
          </div>
          {/* long description */}
          <div>
            <label
              htmlFor=""
              className="block mt-4 text-sm font-medium text-gray-700 mb-2"
            >
              Long Description
            </label>
            <textarea
              name="longDesc"
              rows="5"
              value={formData.longDesc}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
               focus:ring-secondary focus:border-transparent"
              placeholder="Enter Detailed Description"
            ></textarea>
          </div>

          {/* weight & category */}
          <div className="grid mt-4 grid-cols-2 gap-5">
            <div>
              <label
                htmlFor=""
                className="block mt-4 text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                value={formData.category}
                className="bg-gray-50 border rounded-lg border-gray-300 text-gray-900 text-sm focus:outline-none
                   focus:ring-secondary focus:ring-2 focus:border-transparent block w-full p-2.5"
              >
                <option value="">Select a category</option>
                {categoriesData.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className="block mt-4 text-sm font-medium text-gray-700 mb-2"
              >
                Weight
              </label>
              <input
                type="text"
                value={formData.weight}
                name="weight"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary 
            focus:border-transparent"
              />
            </div>
          </div>
        </div>
        {/* image uploads */}
        <div>
          <label
            htmlFor=""
            className="block mt-4 text-sm font-medium text-gray-700 mb-2"
          >
            Product Images (up to 4
          </label>

          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <input
                  type="file"
                  id={`fileUpload-${index}`}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, index)}
                />
                <label
                  htmlFor={`fileUpload-${index}`}
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer
                 hover:border-secondary transition overflow-hidden"
                >
                  {previews[index]? (
                    <img
                      src={previews[index]}
                      className=" h-full object-contain"
                      alt="images"
                    />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-gray-400 mb-1 " />
                      <span className="text-gray-500 text-xs">
                        Upload image {index + 1}
                      </span>
                    </>
                  )}
                </label>
                {formData.images[index]&& (
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {formData.images[index].name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-primary mt-5 text-white px-8 py-3 rounded-md cursor-pointer
         hover:bg-primary transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
