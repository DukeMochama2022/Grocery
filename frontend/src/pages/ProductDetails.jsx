import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { productsData } = useContext(AppContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const product = productsData.find((item) => item._id === id);
    setProduct(product);
  }, []);
  return <div className="py-12"></div>;
};

export default ProductDetails;
