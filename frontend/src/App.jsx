import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Card from "./pages/Card";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails";
import WishList from "./pages/WishList";
import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  const adminPath = useLocation().pathname.includes("admin");
  return (
    <>
      <Toaster />
      <div>
        {!adminPath && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/card" element={<Card />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<WishList />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
