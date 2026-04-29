const Product = require("../models/Product");
const Category = require("../models/Category");

const getStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();

    res.json({
      totalProducts,
      totalCategories
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};