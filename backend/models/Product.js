import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }, 
    description: {
      type: String,
      required: true
    },  
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }, 
    image: {
      type: String,
      required: true
    }, 
    quantity: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;