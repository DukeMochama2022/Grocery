import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { HeartIcon, ShoppingBasket } from "lucide-react";
import { products } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { productsData, currency, addToCart, addToFavourite } =
    useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (productsData && productsData.length > 0) {
      const product = productsData.find((item) => item._id === parseInt(id));
      if (product) {
        setProduct(product);
        if (product.images && product.images.length > 0) {
          setMainImage(product.images[0]);
        }
      }
      const relatedProducts = productsData.filter(
        (item) => item.category === product.category
      );
      setRelatedProducts(relatedProducts);
    }
  }, [productsData, id, product]);

  if (!product) {
    return <div className="py-12 text-center">Loading product...</div>;
  }

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row items-start mt-6 gap-2 justify-center">
        {/* Left side - Gallery */}
        <div className="flex flex-col items-center space-y-4 w-full md:w-1/2">
          <div
            className=" max-w-2xl w-full justify-center "
            id="thumbnail-container"
          >
            <img
              src={mainImage}
              className="w-1/2 rounded-lg "
              alt="product.name"
            />
          </div>
          <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
            {product.images?.map((img, index) => (
              <img
                src={img}
                key={index}
                onClick={() => setMainImage(img)}
                className="thumb rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
              />
            ))}
          </div>
        </div>

        {/* Right side- product info */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <h1 className="text-2xl font-semibold text-gray-800">
            {product.name}
          </h1>

          <div className="flex items-center space-x-4 mt-4">
            <h2 className="text-lg font-bold line-through text-gray-500">
              {currency}
              {product.price}
            </h2>

            <h2 className="text-lg font-bold  text-gray-800">
              {currency}
              {product.offerPrice}
            </h2>
          </div>
          <hr className="w-full mt-4 text-gray-200" />
          <p className="text-lg text-gray-600 font-medium my-2">
            {product.smallDesc}
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 px-8 py-3 bg-secondary text-white font-medium cursor-pointer
             hover:bg-primary transition-all  ease-in-out durtaion-300"
            >
              <ShoppingBasket />
              Add to Cart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              onClick={() => addToFavourite(product)}
              className="flex items-center gap-2 px-8 py-3 bg-secondary text-white font-medium cursor-pointer
             hover:bg-primary transition-all  ease-in-out durtaion-300"
            >
              <HeartIcon />
              Add to Wishlist
            </motion.button>
          </div>
          <p className="text-secondary text-xl font-semibold my-4">
            {product.category}
          </p>
          <div className="border border-gray-200 rounded-lg mt-6 p-3">
            <h1 className="w-full bg-secondary text-white px-2 py-4 text-2xl font-semibold border-b-none">
              Descritpion
            </h1>
            <p>{product.longDesc}</p>
          </div>
        </div>
      </div>

      {/* Related products */}
      <h1 className="text-secondary mt-12 font-extrabold text-3xl text-center">
        {" "}
        Related Products
      </h1>
      <div
        className="grid grid-cols-1 mt-6  sm:grid-cols-2 md:grid-cols-3
       lg:grid-cols-4 xl:grid-cols-4 items-center justify-center gap-4"
      >
        {relatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
