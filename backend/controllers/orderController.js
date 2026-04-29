import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
    const { user, guestInfo, orderItems } = req.body;
    if (!user && !guestInfo) {
        return res.status(400).json({ message: "User/Guest info is required" })
    }
    if (!orderItems || orderItems.length < 1) {
  return res.status(400).json({ message: "Order should contain at least one item." });
}
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

    const newOrder = await Order.create({
        user,
        guestInfo,
        orderItems: processedItems, 
        totalPrice
    })
    res.status(201).json({ message: "Orders created successfully!", newOrder })

} 

export const getOrders = async (req, res) => {
    const orders = await Order.find().populate("user").populate("orderItems.product");
    // if(!orders){
    //     return res.status(400).json({message: "Orders not found!"})
    // }
    res.status(200).json(orders);
}