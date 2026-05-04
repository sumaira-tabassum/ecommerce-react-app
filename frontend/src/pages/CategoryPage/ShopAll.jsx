import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useOutletContext } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";

const ShopAll = () => {
  const [products, setProducts] = useState([]);
  const { handleAddToCart } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get("https://heartfelt-nourishment-production-1ad0.up.railway.app/");
        setProducts(res.data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="category-header">
        <h1 className="category-name">All Products</h1>
      </div>

      <div className="category-cards">
        {products.map((product) => (
          <div key={product._id} className="product-wrapper">

            <ProductCard
              product={product}
              showAddToCart={true}
              onAddToCart={handleAddToCart}
            />

          </div>
        ))}
      </div>
    </div>

  );
};

export default ShopAll;