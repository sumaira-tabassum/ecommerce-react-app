import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { sendOrderEmail } from "../utils/sendOrderEmail.js";

export const createOrder = async (req, res) => {
    const { user, billingInfo, shippingInfo, sameAsBilling, orderItems } = req.body;
    if (!user && !billingInfo) {
        return res.status(400).json({ message: "User/Billing info is required" });
    }
    if (!orderItems || orderItems.length < 1) {
        return res.status(400).json({ message: "Order should contain at least one item." });
    }

    const generateOrderNumber = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let code = "#";

        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return code;
    };


    // orderItems.forEach(item => {
    //     const isProduct = await Product.findById(item.product);
    //     if(!isProduct){
    //         res.status(400).json({message: "Product not found!"})
    //     }
    //     if(item.quantity>Product.quantity){
    //         res.status(400).json({message: "Not enough products avaliable."})
    //     }
    //     TotalPrice = product.price *quantity;
    // });
    const processedItems = [];
    let totalPrice = 0;
    const shippingFee = 250;

    for (const item of orderItems) {
        const product = await Product.findById(item.product);

        if (!product) {
            return res.status(400).json({ message: "Product not found!" });
        }

        if (item.quantity > product.quantity) {
            return res.status(400).json({ message: "Not enough stock available." });
        }

        product.quantity = product.quantity - item.quantity
        await product.save();

        const itemTotal = product.price * item.quantity;
        totalPrice += itemTotal;

        processedItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price
        });
    }
    totalPrice += shippingFee;

    const newOrder = await Order.create({
        orderNumber: generateOrderNumber(),
        user,
        billingInfo,
        shippingInfo: sameAsBilling ? billingInfo : shippingInfo,
        orderItems: processedItems,
        totalPrice,
        shippingFee
    });
    let emailSent = false;
    const populatedOrder = await Order.findById(newOrder._id).populate("orderItems.product");

    try {
        await sendOrderEmail({
            toEmail: billingInfo.email,
            customerName: billingInfo.name,
            orderNumber: newOrder.orderNumber,
            orderDate: newOrder.createdAt,
            totalPrice: newOrder.totalPrice,
            shippingFee: newOrder.shippingFee,
            billing: billingInfo,
            shipping: sameAsBilling ? billingInfo : shippingInfo,
            // phone: billingInfo.phone,
            items: populatedOrder.orderItems
        });

        emailSent = true;
    } catch (emailError) {
        console.error("EMAIL SEND ERROR FULL:", {
            text: emailError?.text,
            status: emailError?.status,
            message: emailError?.message,
            name: emailError?.name,
            stack: emailError?.stack
        });

    }

    res.status(201).json({
        message: "Order created successfully!",
        newOrder,
        emailSent
    });


}

export const getOrders = async (req, res) => {
    const orders = await Order.find().populate("user").populate("orderItems.product");
    // if(!orders){
    //     return res.status(400).json({message: "Orders not found!"})
    // }
    res.status(200).json(orders);
}

export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ["pending", "processing", "in transit", "delivered", "cancelled"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid order status." });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({ message: "Order not found!" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json({
        message: "Order status updated successfully!",
        order: updatedOrder
    });
}
