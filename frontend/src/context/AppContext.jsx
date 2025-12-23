import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { products, categories, blogs } from "../assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);

  const [cart, setCart] = useState([]);
  const [favourite, setFavourite] = useState([]);
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
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    admin,
    setAdmin,
    categoriesData,
    productsData,
    currency,
    blogsData,
    addToCart,
    deleteFromCart,
    cart,
    favourite,
    addToFavourite,
    removeFromFavourite,
    getCartTotal,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
