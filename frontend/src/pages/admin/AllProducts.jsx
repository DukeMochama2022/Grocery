import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX, Edit } from "lucide-react";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { products, categories, currency, axios, backendUrl, fetchProducts } =
    useContext(AppContext);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newImages, setNewImages] = useState([]);

  /* ---------------- OPEN MODAL ---------------- */
  const openEditModal = (product) => {
    setSelectedProduct({
      ...product,
      category: product.category?._id || product.category,
    });
    setNewImages([]);
    setIsUpdateOpen(true);
  };

  /* ---------------- IMAGE CHANGE ---------------- */
  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  /* ---------------- DELETE ---------------- */
  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/product/delete/${id}`
      );

      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  /* ---------------- UPDATE ---------------- */
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", selectedProduct.name);
      formData.append("price", selectedProduct.price);
      formData.append("offerPrice", selectedProduct.offerPrice);
      formData.append("weight", selectedProduct.weight);
      formData.append("category", selectedProduct.category);
      formData.append("smallDesc", selectedProduct.smallDesc || "");
      formData.append("longDesc", selectedProduct.longDesc || "");

      newImages.forEach((img) => {
        formData.append("images", img);
      });

      const { data } = await axios.put(
        `${backendUrl}/api/product/update/${selectedProduct._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsUpdateOpen(false);
        setSelectedProduct(null);
        setNewImages([]);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  /* ===================== UI ===================== */
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="border border-gray-300 max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="grid grid-cols-7 font-semibold text-gray-700 mb-3">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Weight</div>
          <div>Price</div>
          <div>Offer</div>
          <div>Actions</div>
        </div>

        <hr />

        {/* Products */}
        {products.map((item) => (
          <div key={item._id}>
            <div className="grid grid-cols-7 items-center py-3">
              <img
                src={backendUrl + `${item.images?.[0]}`}
                alt=""
                className="w-16 h-16 object-cover rounded"
              />
              <p>{item.name}</p>
              <p>{item.category?.name}</p>
              <p>{item.weight}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p className="text-primary">
                {currency}
                {item.offerPrice}
              </p>

              <div className="flex gap-4">
                <CircleX
                  onClick={() => deleteProduct(item._id)}
                  className="text-red-500 cursor-pointer"
                />
                <Edit
                  onClick={() => openEditModal(item)}
                  className="text-blue-500 cursor-pointer"
                />
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {/* ================= UPDATE MODAL ================= */}
      {isUpdateOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg">
            {/* Header */}
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Update Product</h2>
              <CircleX
                className="cursor-pointer text-red-500"
                onClick={() => setIsUpdateOpen(false)}
              />
            </div>

            {/* Form */}
            <form onSubmit={updateProduct} className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
                placeholder="Product name"
              />

              <input
                type="number"
                className="w-full border p-2 rounded"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
                placeholder="Price"
              />

              <input
                type="number"
                className="w-full border p-2 rounded"
                value={selectedProduct.offerPrice}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    offerPrice: e.target.value,
                  })
                }
                placeholder="Offer Price"
              />

              <input
                className="w-full border p-2 rounded"
                value={selectedProduct.weight}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    weight: e.target.value,
                  })
                }
                placeholder="Weight"
              />

              {/* Category */}
              <select
                className="w-full border p-2 rounded"
                value={selectedProduct.category}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value,
                  })
                }
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Existing images */}
              <div className="flex gap-2 flex-wrap">
                {selectedProduct.images?.map((img, i) => (
                  <img
                    key={i}
                    src={backendUrl + img}
                    className="w-16 h-16 object-cover border rounded"
                  />
                ))}
              </div>

              {/* New images */}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:opacity-90"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
