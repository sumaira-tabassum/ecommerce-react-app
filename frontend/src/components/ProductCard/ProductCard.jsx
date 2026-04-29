import React from 'react'
import styles from "./ProductCard.module.css";
import { Link } from 'react-router-dom';

const ProductCard = ({ product, showAddToCart, onAddToCart }) => {
  
  return (
      
        <div className={styles.card}>
          <Link to={`/product/${product._id}`} className={styles.link}>
          <img
            src={product?.image}
            alt={product?.name}
            className={styles.cardImage}
          />
          <h3 className={styles.cardName}>{product?.name}</h3>
          <p className={styles.cardPrice}>Price: {product?.price}</p>
          </Link>
          {showAddToCart && (
            <button onClick={() => onAddToCart(product)} className={styles.addToCardBtn}>
              Add to Cart
            </button>
          )}
        </div>
  )
}

export default ProductCard;