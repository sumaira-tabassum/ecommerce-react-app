import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Checkout.css";
import { useLocation } from "react-router-dom";

const Checkout = () => {
    const { cart, setCart } = useOutletContext();
    const shipping = 250;
    const location = useLocation();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        zipcode: "",
        address: "",
        note: ""
    });

    const [sameAsBilling, setSameAsBilling] = useState(true);

    const [shippingForm, setShippingForm] = useState({
        name: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        zipcode: "",
        address: "",
        note: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleShippingChange = (e) => {
        setShippingForm({
            ...shippingForm,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = async () => {
        if (!form.name || !form.phone || !form.country || !form.state || !form.city || !form.address) {
            alert("Please fill all fields");
            return;
        }

        try {
            const orderData = {
                user: null,
                guestInfo: form,
                orderItems: cart.map((item) => ({
                    product: item.product._id,
                    quantity: item.quantity
                }))
            };

            await axios.post("http://localhost:3000/api/orders", orderData);

            setCart([]);
            alert("Order placed successfully!");
        } catch (error) {
            console.log(error);
            alert("Order failed");
        }
    };

    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <div className="checkout">

            <div className="checkout-left">
                <h2>Contact Details</h2>

                <div className="form">

                    <div className="wrapper-1">

                        <div className="name">
                            <label>Customer Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Customer Name"
                                value={form.name}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="phone-number">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                    </div>

                    <div className="wrapper-2">
                        <div className="country">
                            <label>Country</label>
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={form.country}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="state">
                            <label>State</label>
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={form.state}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="wrapper-3">
                        <div className="city">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="zip-code">
                            <label>ZIP / Postcode</label>
                            <input
                                type="text"
                                name="zipcode"
                                placeholder="ZIP / Post Code"
                                value={form.zipcode}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="address">
                        <label>Street Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Street Address"
                            value={form.address}
                            onChange={handleChange}
                            className="street-address"
                        />
                    </div>

                    <div className="shipping-information">
                        <input
                            type="checkbox"
                            id="sameAsBilling"
                            checked={sameAsBilling}
                            onChange={(e) => setSameAsBilling(e.target.checked)}
                        />
                        <p>Shipping Address is the same as Billing Address</p>
                    </div>

                    {sameAsBilling && <hr className="section-divider" />}

                    {!sameAsBilling && (
                        <div className="shipping-form">
                            <h2 className="heading">Shipping Address</h2>

                            <div className="wrapper-1">

                                <div className="name">
                                    <label>Customer Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Customer Name"
                                        value={shippingForm.name}
                                        onChange={handleShippingChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="phone-number">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={shippingForm.phone}
                                        onChange={handleShippingChange}
                                        className="form-input"
                                    />
                                </div>

                            </div>

                            <div className="wrapper-2">
                                <div className="country">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        value={shippingForm.country}
                                        onChange={handleShippingChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="state">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={shippingForm.state}
                                        onChange={handleShippingChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="wrapper-3">
                                <div className="city">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={shippingForm.city}
                                        onChange={handleShippingChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="zip-code">
                                    <label>ZIP / Postcode</label>
                                    <input
                                        type="text"
                                        name="zipcode"
                                        placeholder="ZIP / Post Code"
                                        value={shippingForm.zipcode}
                                        onChange={handleShippingChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="address">
                                <label>Street Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Street Address"
                                    value={shippingForm.address}
                                    onChange={handleShippingChange}
                                    className="street-address"
                                />
                            </div>

                            <hr className="section-divider" />
                        </div>
                    )}

                    <div className="order-note">
                    <label>Order Note (optional)</label>
                    <textarea name="comments" rows="4" cols="50" placeholder="Notes about your order, e.g. special notes for delivery">.</textarea>
                    </div>

                </div>
            </div>

            <div className="checkout-right">
                <h2>Your Order</h2>
                <p className="ordered-items">Ordered Items</p>

                <hr className="section-divider" />

                {cart.map((item) => (
                    <div key={item.product._id} className="summary-item">
                        <img src={item.product.image} alt={item.product.name} />
                        <div className="product-detail">
                            <p>{item.product.name}</p>
                            <p>Qty: {item.quantity}</p>
                            <p>Rs {item.product.price}</p>
                        </div>
                    </div>
                ))}

                <div className="total-price">
                    <div className="subtotal">
                    <p>Subtotal: </p>
                    <p>Rs {total}</p>
                    </div>
                    <div className="tax">
                    <p>Tax: </p>
                    <p> Rs 0</p>
                    </div>
                    <div className="shipping">
                    <p>Shipping: </p>
                    <p> Rs {shipping}</p>
                    </div>
                    <hr className="section-divider" />
                    <div className="total">
                    <h3>Total: </h3>
                    <h3>Rs {total+shipping}</h3>
                    </div>
                </div>

                <button onClick={handlePlaceOrder} className="place-order-btn">
                    Place Order
                </button>
            </div>

        </div>
    );
};

export default Checkout;
