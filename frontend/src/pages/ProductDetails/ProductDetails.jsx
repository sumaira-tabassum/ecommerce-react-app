import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetails.css"
import { useOutletContext, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { handleAddToCart } = useOutletContext();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                const res = await axios.get(`http://localhost:3000/api/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            title: "Shipping Info",
            content: "We deliver within 3–5 working days. Shipping charges may apply based on location."
        },
        {
            title: "Refund & Return Policy",
            content: "Returns are accepted within 7 days if the product is unused and in original packaging."
        },
        {
            title: "Product Info",
            content: "All products are 100% authentic and carefully tested for quality."
        }
    ];

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    // if (!product) return <p>Loading...</p>;

    if (loading) return <Loader />;

    return (
        <div className="product">

            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">Price: {product.price}</p>

                <div className="quantity-control">
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>

                <div className="product-actions">
                    <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product, quantity)}
                    >
                        Add to Cart
                    </button>
                    <button
                        className="buy-now-btn"
                        onClick={() => navigate("/checkout")}
                    >
                        Buy Now
                    </button>
                </div>

                <p className="product-description">{product.description}</p>

                <div className="faq-section">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">

                            <div
                                className="faq-header"
                                onClick={() => handleToggle(index)}
                            >
                                <p>{faq.title}</p>
                                <span>{openIndex === index ? "−" : "+"}</span>
                            </div>

                            {openIndex === index && (
                                <div className="faq-content">
                                    <p>{faq.content}</p>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default ProductDetails;