import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { productsData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (productsData && productsData.length > 0) {
      const product = productsData.find((item) => item._id === parseInt(id));
      if (product) {
        setProduct(product);
        if (product.images && product.images.length > 0) {
          setMainImage(product.images[0]);
        }
      }
    }
  }, [productsData, id]);
  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row items-start mt-6 gap-6 justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
