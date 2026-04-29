import { useEffect, useState } from "react";
import API from "../../api/api.js";
import heroImage from "../../assets/bg.JPG";
import styles from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShinyText from "../../components/ShinyText/ShinyText.jsx";

function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get("/products");
                setProducts(res.data);
            }
            catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>

            <div className={styles.hero} style={{ backgroundImage: `url(${heroImage})` }}>
                <div className={styles.heroText}>
                    <div className={styles.yourGlow}>
                    <p>your </p>
                    <ShinyText
                        text="glow"
                        speed={2}
                        delay={0}
                        color="#6A0610"
                        shineColor="#f4bfbf"
                        spread={120}
                        direction="left"
                        yoyo={false}
                        pauseOnHover={false}
                        disabled={false}
                    />
                    </div>
                    <p>revolution starts here.</p>
                    {/* <br/> */}
                    {/* <ShinyText
                        text="revolution starts here"
                        speed={2}
                        delay={0}
                        color="#6A0610"
                        shineColor="#ffffff"
                        spread={120}
                        direction="left"
                        yoyo={false}
                        pauseOnHover={false}
                        disabled={false}
                    /> */}

                    <Link to="/shop">
                        <button className={styles.heroButton}>Shop Now</button>
                    </Link>
                    <p className={styles.heroTitle}>sheglam.</p>
                </div>
            </div>

            <div>
                <div className={styles.productsHeader}>
                    <h2 className={styles.productsTitle}>New Arrivals</h2>
                    <Link to="/shop">
                        <button className={styles.shopBtn}>
                            Shop All
                        </button>
                    </Link>
                </div>
                {/* <h1>Products</h1> */}
                <div className={styles.productCards}>
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product} />
                    )).slice(0, 5)
                    }
                </div>
            </div>

            <div className={styles.testimonial}>
                <h1 className={styles.testimonialQuote}>“Finally, beauty that actually works.”</h1>
                <p className={styles.testimonialAuthor}>— Riley, SA</p>
            </div>
        </div>
    );
}

export default Home;