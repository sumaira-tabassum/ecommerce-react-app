import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();

    res.json({
      totalProducts,
      totalCategories,
    });
  } catch {
    res.status(500).json({ message: "Error fetching stats" });
  }
};
