import React from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { Upload } from "lucide-react";

const AddCategory = () => {
  const { navigate, loading, setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    setFormData({ ...formData, image: selectedFile });
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/categories");
    toast.success("Category added successfully.");
  };
  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-md w-full flex flex-col gap-5"
      >
        {preview && <img src={preview} alt="" className="w-1/2" />}
        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-medium text-gray-700mb-2"
          >
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Category Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
            focus:ring-secondary focus:border-transparent "
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-medium text-gray-700mb-2"
          >
            Category Image
          </label>
          <input
            id="fileUpload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            required
          />
          {/* custom upload */}
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed
          border-gray-300 rounded-lg cursor-pointer hover:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition"
          ></label>
          <Upload className="w-8 h-8 mt-4 text-gray-500 mb-2" />
          <span className="text-gray-600 text-sm">
            {file ? file.name : "Click to upload image"}
          </span>
        </div>
        <button className="bg-primary px-8 py-3 cursor-pointer  text-white ">
          {loading ? "loading..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
