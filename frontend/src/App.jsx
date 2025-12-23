import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails";
import WishList from "./pages/WishList";
import NavBar from "./components/NavBar";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddCategory from "./pages/admin/AddCategory";
import AllCategories from "./pages/admin/AllCategories";
import AddProduct from "./pages/admin/AddProduct";
import AllProducts from "./pages/admin/AllProducts";
import Orders from "./pages/admin/Orders";
import AdminLogin from "./pages/admin/AdminLogin";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { admin } = useContext(AppContext);
  const adminPath = useLocation().pathname.includes("admin");
  return (
    <>
      <Toaster />
      <div className="w-full mx-auto px-4 md:px-6 lg:px-8">
        {!adminPath && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<WishList />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={admin ? <AdminLayout /> : <AdminLogin />}
          >
            <Route index element={admin ? <Dashboard /> : <AdminLogin />} />
            <Route
              path="add-category"
              element={admin ? <AddCategory /> : <AdminLogin />}
            />
            <Route
              path="categories"
              element={admin ? <AllCategories /> : <AdminLogin />}
            />
            <Route
              path="add-product"
              element={admin ? <AddProduct /> : <AdminLogin />}
            />
            <Route
              path="products"
              element={admin ? <AllProducts /> : <AdminLogin />}
            />
            <Route
              path="orders"
              element={admin ? <Orders /> : <AdminLogin />}
            />
          </Route>
        </Routes>
        {!adminPath && <Footer />}
      </div>
    </>
  );
};

export default App;
