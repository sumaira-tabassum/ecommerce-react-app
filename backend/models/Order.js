import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    billingInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        zipcode: { type: String },
        address: { type: String, required: true },
        note: { type: String }
    },
    shippingInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        zipcode: { type: String },
        address: { type: String, required: true },
        note: { type: String }
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            // Saved at checkout so the order still shows correctly if the product is later edited or deleted
            name: { type: String },
            price: { type: Number },
            image: { type: String }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        required: true,
        default: 250
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
