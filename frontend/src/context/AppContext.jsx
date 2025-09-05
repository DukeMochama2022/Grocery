import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../assets/assets";
import { products } from "../assets/assets";
import { useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchCategories = async () => {
    setCategoriesData(categories);
  };

  const fetchProducts = async () => {
    setProductsData(products);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const value = { navigate, user, setUser, categoriesData, productsData,currency };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
