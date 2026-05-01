import "./CartSidebar.css";
import { FaTrashAlt } from 'react-icons/fa';
// import { FaTimes } from 'react-icons/fa'; // Font Awesome cross
// import { IoClose } from 'react-icons/io5'; // Ionicons cross
import { MdClose } from 'react-icons/md'; // Material Design cross
// import { FaLock } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import { useNavigate } from "react-router-dom";


const CartSidebar = ({ open, setOpen, cart, setCart, handleCheckout }) => {
    const navigate = useNavigate();
    const handleRemove = (id) => {
        const updatedCart = cart.filter(
            (item) => item.product._id !== id
        );
        setCart(updatedCart);
    };

    const handleIncrease = (id) => {
        const updatedCart = cart.map((item) =>
            item.product._id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCart(updatedCart);
    };

    const handleDecrease = (id) => {
        const updatedCart = cart
            .map((item) =>
                item.product._id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);

        setCart(updatedCart);
    };


    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    return (
        <>
            <div
                className={`overlay ${open ? "show" : ""}`}
                onClick={() => setOpen(false)}
            ></div>

            <div className={`cartSidebar ${open ? "open" : ""}`}>
                <div className="cartTop">
                    <h2 className="cartHeading">Cart</h2>
                    <MdClose size={24} color="#6A0610" className="cartClose" onClick={() => setOpen(false)}></MdClose>
                </div>

                <div className="cartItems">
                    {cart.length === 0 ? (
                        <div className="cartEmpty">
                            <p>Your cart is currently empty.</p>
                            <p
                                className="continueShoppingText"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/shop");
                                }}
                            >
                                Click here to continue shopping.
                            </p>
                        </div>
                    ) : (

                        cart.map((item) => (
                            <div key={item.product._id} className="cartItem">
                                <div className="cartLeft">
                                    <img
                                        src={item.product?.image}
                                        alt={item.product?.name}
                                        className="productImage"
                                    />
                                </div>
                                <div className="cartCenter">
                                    <p className="productName">{item.product.name}</p>

                                    <div className="quantityControl">
                                        <button onClick={() => handleDecrease(item.product._id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrease(item.product._id)}>+</button>
                                    </div>

                                    <p>Price: {item.product.price}</p>
                                </div>
                                <div className="cartRight">
                                    <FaTrashAlt onClick={() => handleRemove(item.product._id)} className="cartRemoveButton" />
                                </div>
                            </div>
                        )))}
                </div>

                {cart.length !== 0 && (
                    <div className="cartBottom">
                        <div className="totalPrice">
                            <p>Estimated total: </p>
                            <p>{total}</p>
                        </div>
                        <p className="taxesLine">Taxes and shipping are calculated at checkout.</p>
                        <button onClick={() => { setOpen(false); navigate("/checkout"); }} className="checkoutButton"><h3>Checkout</h3></button>
                        <button onClick={() => { setOpen(false); navigate("/cart"); }} className="viewCartButton"><h3>View Cart</h3></button>
                        <div className="secureCheckout">
                            <MdLock size={20} color="#6A0610"></MdLock>
                            <p>Secure Checkout</p>
                        </div>
                    </div>
                )}



            </div>
        </>
    );
};

export default CartSidebar;