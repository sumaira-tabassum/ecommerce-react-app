import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Checkout.css";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
    const { cart, setCart } = useOutletContext();
    const [placingOrder, setPlacingOrder] = useState(false);
    const shipping = 250;
    // const location = useLocation();

    const checkoutAlert = Swal.mixin({
        customClass: {
            popup: "checkout-swal-popup",
            icon: "checkout-swal-icon",
            title: "checkout-swal-title",
            htmlContainer: "checkout-swal-text",
            confirmButton: "checkout-swal-confirm"
        },
        buttonsStyling: false,
        background: "#fffdf8",
        color: "#6A0610",
        confirmButtonText: "Continue Shopping"
    });


    const [sameAsBilling, setSameAsBilling] = useState(() => {
        const savedSameAsBilling = localStorage.getItem("checkoutSameAsBilling");
        return savedSameAsBilling ? JSON.parse(savedSameAsBilling) : true;
    });

    const [form, setForm] = useState(() => {
        const savedForm = localStorage.getItem("checkoutBillingForm");
        return savedForm ? JSON.parse(savedForm) : {
            name: "",
            email: "",
            phone: "",
            country: "",
            state: "",
            city: "",
            zipcode: "",
            address: "",
            note: ""
        };
    });

    const [shippingForm, setShippingForm] = useState(() => {
        const savedShippingForm = localStorage.getItem("checkoutShippingForm");
        return savedShippingForm ? JSON.parse(savedShippingForm) : {
            name: "",
            email: "",
            phone: "",
            country: "",
            state: "",
            city: "",
            zipcode: "",
            address: "",
            note: ""
        };
    });

    useEffect(() => {
        localStorage.setItem("checkoutBillingForm", JSON.stringify(form));
    }, [form]);

    useEffect(() => {
        localStorage.setItem("checkoutShippingForm", JSON.stringify(shippingForm));
    }, [shippingForm]);

    useEffect(() => {
        localStorage.setItem("checkoutSameAsBilling", JSON.stringify(sameAsBilling));
    }, [sameAsBilling]);

    const resetCheckoutState = () => {
        const emptyForm = {
            name: "",
            email: "",
            phone: "",
            country: "",
            state: "",
            city: "",
            zipcode: "",
            address: "",
            note: ""
        };

        setForm(emptyForm);
        setShippingForm(emptyForm);
        setSameAsBilling(true);

        localStorage.removeItem("checkoutBillingForm");
        localStorage.removeItem("checkoutShippingForm");
        localStorage.removeItem("checkoutSameAsBilling");
    };

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
        if (placingOrder) return;
        if (!form.name || !form.email || !form.phone || !form.country || !form.state || !form.city || !form.address) {
            alert("Please fill all fields");
            return;
        }
        setPlacingOrder(true);
        try {
            const orderData = {
                user: null,
                guestInfo: form,
                orderItems: cart.map((item) => ({
                    product: item.product._id,
                    quantity: item.quantity
                }))
            };

            const response = await axios.post("http://localhost:3000/api/orders", orderData);

            setCart([]);
            resetCheckoutState();
            checkoutAlert.fire({
                icon: "success",
                title: "Order Confirmed!",
                html: response.data.emailSent
                    ? `
      <div>
        <p>Your order <strong>${response.data.newOrder.orderNumber}</strong> has been placed successfully.</p>
        <p>A confirmation email has been sent to <strong>${form.email}</strong>.</p>
      </div>
    `
                    : `
      <div>
        <p>Your order <strong>${response.data.newOrder.orderNumber}</strong> has been placed successfully.</p>
        <p>We could not send the confirmation email right now.</p>
      </div>
    `
            });

        } catch (error) {
            console.log(error);
            checkoutAlert.fire({
                icon: "error",
                title: "Order Not Placed",
                html: `
    <div>
      <p>${error.response?.data?.message || "Something went wrong while placing your order."}</p>
      <p>Please review your details and try again.</p>
    </div>
  `,
                confirmButtonText: "Try Again"
            });

        }
        finally {
            setPlacingOrder(false);
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

                        <div className="email">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="wrapper-2">
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
                    </div>

                    <div className="wrapper-3">
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

                    </div>

                    <div className="wrapper-4">

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

                                <div className="email">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={shippingForm.email}
                                        onChange={handleShippingChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="wrapper-2">
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
                            </div>

                            <div className="wrapper-3">
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

                            </div>

                            <div className="wrapper-4">

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
                            </div>

                            <hr className="section-divider" />
                        </div>
                    )}

                    <div className="order-note">
                        <label>Order Note (optional)</label>
                        <textarea
                            name="note"
                            rows="4"
                            cols="50"
                            placeholder="Notes about your order, e.g. special notes for delivery"
                            value={form.note}
                            onChange={handleChange}
                        />

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
                        <h3>Rs {total + shipping}</h3>
                    </div>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    className="place-order-btn"
                    disabled={placingOrder}
                >
                    {placingOrder ? (
                        <span className="dot-loader">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    ) : (
                        "Place Order"
                    )}
                </button>

            </div>

        </div>
    );
};

export default Checkout;
