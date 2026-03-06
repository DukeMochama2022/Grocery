import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategoriesData] = useState([]);
  const [products, setProductsData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [cart, setCart] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
  });

  const currency = import.meta.env.VITE_CURRENCY;

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setUser(true);
      }
    } catch (error) {
      setUser(null);
    } finally {
    }
  };

  const checkAdmin = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/is-admin`, {
      });
      if (data.success) {
        setAdmin(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/category/all");
      if (data.success) {
        setCategoriesData(data.categories);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/product/all");
      if (data.success) {
        setProductsData(data.products);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/dashboard/statistics"
      );
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddress = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogs = async () => {
    setBlogsData(blogs);
  };

  // add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const newCart = structuredClone(prev);
      const existingProduct = newCart.find((item) => item._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        newCart.push({ ...product, quantity: 1 });
      }
      toast.success("Product added to cart!");
      return newCart;
    });
  };

  //remove item from cart
  const deleteFromCart = (id) => {
    setCart((prev) => {
      const newCart = structuredClone(prev);
      const existingProduct = newCart.find((item) => item._id === id);
      if (existingProduct.quantity === 1) {
        return newCart.filter((item) => item._id !== id);
      } else {
        existingProduct.quantity -= 1;
      }
      return newCart;
      toast.success("Product removed from Cart!");
    });
  };

  //add to Favourites
  const addToFavourite = (product) => {
    setFavourite((prev) => {
      const newFavourite = structuredClone(prev);
      if (!newFavourite.find((item) => item._id === product._id)) {
        newFavourite.push(product);
        toast.success("Product added to favourite.");
      } else {
        toast.error("Product already added to favourite.");
      }
      return newFavourite;
    });
  };

  //remove from favourite
  const removeFromFavourite = (id) => {
    setFavourite((prev) => {
      const newFavourite = structuredClone(prev);
      const removed = newFavourite.filter((item) => item._id !== id);
      toast.success("Product removed from Favourites!");
      return removed;
    });
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.offerPrice * item.quantity,
      0
    );
  };
  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchBlogs();
    checkAuth();
    checkAdmin();
    fetchStats();
    fetchAddress();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    admin,
    setAdmin,
    categories,
    products,
    currency,
    blogsData,
    addToCart,
    deleteFromCart,
    cart,
    favourite,
    addToFavourite,
    removeFromFavourite,
    getCartTotal,
    loading,
    setLoading,
    axios,
    backendUrl,
    fetchCategories,
    fetchProducts,
    stats,
    fetchStats,
    addresses,
    fetchAddress,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
