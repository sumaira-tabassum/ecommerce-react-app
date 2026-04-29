import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getProducts = async (req, res)=>{
    const { category } = req.query;

    let filter = {};

    if (category) {
         const categoryDoc = await Category.findOne({
            name: { $regex: category, $options: "i" }
        });

        if (categoryDoc) {
            filter.category = categoryDoc._id;
        } else {
            return res.status(200).json([]); // no match
        }
    }
    const products = await Product.find(filter).populate("category");
    console.log("Query category: ", category)
    res.status(200).json(products);
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category");
    if(!product){
       return res.status(404).json({message: "Product not found!"})
    }
    res.json(product);
}

export const createProduct = async (req, res) => {
    const {sku, name, price, description, category, image, quantity} = req.body;
    if (!name || !price){
        return res.status(400).json({message: "Name and price for product is required."})
    }
    const newProduct = await Product.create({sku, name, price, description, category, image, quantity});
    res.status(201).json(newProduct);
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({message: "Product not found!"})
    }
    await product.deleteOne();
    res.status(200).json({message: "Product deleted successfully!"})
}

export const updateProduct = async (req, res) => {
    // const {name, price} = req.body;
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).send({message: "Product not found"})
    }
    product.sku = req.body.sku ?? product.sku
    product.name = req.body.name ?? product.name
    product.price = req.body.price ?? product.price
    product.description = req.body.description ?? product.description
    product.category = req.body.category ?? product.category
    product.image = req.body.image ?? product.image
    product.quantity = req.body.quantity ?? product.quantity
    const updated = await product.save();
    res.json(updated);
}