import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CartSidebar from "../components/CartSidebar/CartSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CustomerLayout = () => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const hideLayout = location.pathname === "/checkout";

  const handleCheckout = async () => {
    try {
      const orderData = {
        user: null,
        guestInfo: {
          name: "Guest User",
          address: "N/A"
        },
        orderItems: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity
        }))
      };

      await axios.post("http://localhost:3000/api/orders", orderData);

      setCart([]);
      setCartOpen(false);

      alert("Order placed successfully!");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Order failed");
    }
  };

  const handleAddToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [...prev, { product, quantity: qty }];
    });

    setCartOpen(true);
  };

  return (
    <>
      <Header />
      <Navbar
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
      <CartSidebar
        open={cartOpen}
        setOpen={setCartOpen}
        cart={cart}
        setCart={setCart}
        handleCheckout={handleCheckout}
      />
      <Outlet context={{
        cart,
        setCart,
        cartOpen,
        setCartOpen,
        handleAddToCart
      }} />
      <Footer />
      {/* {!hideLayout && <Navbar cart={cart} setCartOpen={setCartOpen} />}
      {!hideLayout && <Footer />} */}
    </>
  );
};

export default CustomerLayout;