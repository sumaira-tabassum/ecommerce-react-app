import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/api.js";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import "./CategoryPage.css";
import { useOutletContext } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useOutletContext();
  const { handleAddToCart } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/products?category=${category}`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // const handleAddToCart = (product) => {
  //   setCart([...cart, product]);
  // };
  if (loading) return <Loader />;

  return (
    <div>
      <div className="category-header">
        <h1 className="category-name">{category}</h1>
        <p className="quantity">{products.quantity}</p>
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
}

export default CategoryPage;