import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { products, categories, blogs } from "../assets/assets";
import { useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);

  const currency = import.meta.env.VITE_CURRENCY;

  const fetchCategories = async () => {
    setCategoriesData(categories);
  };

  const fetchProducts = async () => {
    setProductsData(products);
  };

  const fetchBlogs = async () => {
    setBlogsData(blogs);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchBlogs();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    categoriesData,
    productsData,
    currency,
    blogsData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
