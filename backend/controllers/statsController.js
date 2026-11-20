import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const DAY = 24 * 60 * 60 * 1000;

export const getStats = async (req, res) => {
  try {
    const [products, categories, orders, totalCustomers] = await Promise.all([
      Product.find({}, "category quantity"),
      Category.find({}, "name"),
      Order.find({}, "totalPrice shippingFee status createdAt"),
      User.countDocuments({ role: { $ne: "admin" } }),
    ]);

    // Cancelled orders don't count towards sales
    const validOrders = orders.filter((o) => o.status !== "cancelled");
    const totalSales = validOrders.reduce((sum, o) => sum + o.totalPrice, 0);
    const netRevenue = validOrders.reduce((sum, o) => sum + o.totalPrice - (o.shippingFee || 0), 0);
    const pendingOrders = orders.filter((o) => o.status === "pending").length;

    // Sales for each of the last 7 days (oldest first)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const salesLast7Days = Array.from({ length: 7 }, (_, i) => {
      const start = new Date(today.getTime() - (6 - i) * DAY);
      const end = new Date(start.getTime() + DAY);
      const total = validOrders
        .filter((o) => o.createdAt >= start && o.createdAt < end)
        .reduce((sum, o) => sum + o.totalPrice, 0);
      return { day: start.toLocaleDateString("en-US", { weekday: "short" }), total };
    });

    // Share of the catalogue in each category
    const productsByCategory = categories
      .map((c) => ({
        name: c.name,
        count: products.filter((p) => String(p.category) === String(c._id)).length,
      }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);

    res.json({
      totalSales,
      netRevenue,
      totalOrders: orders.length,
      pendingOrders,
      totalCustomers,
      totalProducts: products.length,
      totalCategories: categories.length,
      lowStock: products.filter((p) => p.quantity < 10).length,
      salesLast7Days,
      productsByCategory,
    });
  } catch {
    res.status(500).json({ message: "Error fetching stats" });
  }
};
