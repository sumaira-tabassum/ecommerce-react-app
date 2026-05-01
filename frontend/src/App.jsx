import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import "./index.css"
import Header from "./components/Header/Header";
import ShopAll from "./pages/CategoryPage/ShopAll";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import AdminLayout from "./admin/layout/AdminLayout.jsx";
import Dashboard from "./admin/pages/Dashboard/Dashboard.jsx";
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import Products from "./admin/pages/Products/Products.jsx";
import AddProducts from "./admin/pages/Products/AddProducts.jsx";
import EditProduct from "./admin/pages/Products/EditProduct.jsx";
import CartSidebar from "./components/CartSidebar/CartSidebar.jsx"
import Checkout from "./pages/Checkout/Checkout.jsx"
import Orders from "./admin/pages/Orders.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Cart from "./pages/Cart/Cart.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx";
import AdminLogin from "./admin/pages/AdminLogin/AdminLogin.jsx"

function App() {
  return (
    <div>
      <ScrollToTop />

      <Routes>

        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<ShopAll />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>

          <Route index element={<Dashboard />} />

          <Route path="products">
            <Route index element={<Products />} />
            <Route path="add" element={<AddProducts />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>

          <Route path="orders" element={<Orders />} />

        </Route>
      </Routes>
    </div >
  )
}

export default App;
