import { useOutletContext, Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
    const { cart, setCart } = useOutletContext();
    const shipping = 250;

    const handleRemove = (id) => {
        setCart(cart.filter((item) => item.product._id !== id));
    };

    const handleIncrease = (id) => {
        setCart(
            cart.map((item) =>
                item.product._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrease = (id) => {
        setCart(
            cart
                .map((item) =>
                    item.product._id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="empty-cart-wrapper">
                <p className="empty-cart">Your cart is empty</p>
                <Link to="/shop" className="continue-shopping">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-left">
                <div className="cart-heading">
                    <h2>Your Cart</h2>
                    <p>{cart.length} item{cart.length > 1 ? "s" : ""}</p>
                </div>

                <div className="cart-list">
                    {cart.map((item) => (
                        <div key={item.product._id} className="cart-row">
                            <img src={item.product.image} alt={item.product.name} />

                            <div className="cart-info">
                                <p className="cart-product-name">{item.product.name}</p>
                                {/* <p className="cart-product-price">Rs {item.product.price}</p> */}

                                <div className="cart-row-bottom">
                                    <div className="qty">
                                        <button onClick={() => handleDecrease(item.product._id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrease(item.product._id)}>+</button>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemove(item.product._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            <p className="cart-item-total">
                                Rs {item.product.price * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cart-right">
                <div className="cart-total">
                    <h3>Cart Totals</h3>
                    <hr className="section-divider" />

                    <div className="summary-row">
                        <p>Subtotal</p>
                        <p>Rs {total}</p>
                    </div>

                    <div className="summary-row">
                        <p>Tax</p>
                        <p>Rs 0</p>
                    </div>

                    <div className="summary-row">
                        <p>Shipping</p>
                        <p>Rs {shipping}</p>
                    </div>

                    <p className="promo-label">Do you have a promo code?</p>

                    <div className="promo-code">
                        <input
                            className="promo-input"
                            placeholder="Enter coupon code"
                        />
                        <button className="promo-btn">Apply</button>
                    </div>

                    <hr className="section-divider" />

                    <div className="summary-row total-row">
                        <h3>Total</h3>
                        <h3>Rs {total + shipping}</h3>
                    </div>

                    <Link to="/checkout" className="checkout-link">
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
