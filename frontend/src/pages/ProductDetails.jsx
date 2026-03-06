import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { HeartIcon, ShoppingBasket } from "lucide-react";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, currency, addToCart, addToFavourite, backendUrl } =
    useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    // ✅ find product (string comparison)
    const foundProduct = products.find((item) => item._id === id);

    if (!foundProduct) return;

    setProduct(foundProduct);

    if (foundProduct.images?.length > 0) {
      setMainImage(backendUrl + foundProduct.images[0]);
    }

    // ✅ related products (safe for populated OR non-populated category)
    const related = products.filter(
      (item) =>
        item._id !== foundProduct._id &&
        (item?.category?._id === foundProduct?.category?._id ||
          item?.category === foundProduct?.category)
    );

    setRelatedProducts(related);
  }, [products, id]);

  if (!product) {
    return <div className="py-12 text-center">Loading product...</div>;
  }

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row items-start mt-6 gap-6 justify-center">
        {/* Gallery */}
        <div className="flex flex-col items-center space-y-4 w-full md:w-1/2">
          <img
            src={mainImage}
            className="w-1/2 rounded-lg"
            alt={product.name}
          />

          <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={backendUrl + img}
                onClick={() => setMainImage(backendUrl + img)}
                className="rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
                alt=""
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="flex items-center gap-4 mt-4">
            <span className="line-through text-gray-500">
              {currency}
              {product.price}
            </span>
            <span className="text-primary font-bold">
              {currency}
              {product.offerPrice}
            </span>
          </div>

          <p className="mt-4 text-gray-600">{product.smallDesc}</p>

          <div className="flex gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded"
            >
              <ShoppingBasket /> Add to Cart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => addToFavourite(product)}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded"
            >
              <HeartIcon /> Wishlist
            </motion.button>
          </div>

          {/* Category */}
          <p className="text-secondary font-semibold mt-4">
            Category: {product.category?.name || product.category}
          </p>

          <div className="border rounded-lg mt-6 p-4">
            <h2 className="font-bold text-xl mb-2">Description</h2>
            <p>{product.longDesc}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold text-center mt-12">
            Related Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
