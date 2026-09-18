const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", async (req, res) => {
  const { range = "30" } = req.query;

  try {
    // --------------------------------
    // 1. DATE FILTER
    // --------------------------------

    const days = Number(range);

    const startDate = new Date();

    startDate.setDate(startDate.getDate() - days);

    // --------------------------------
    // 2. BASIC STATS
    // --------------------------------

    const totalOrders = await Order.countDocuments({
      createdAt: {
        $gte: startDate,
      },
    });

    const totalProducts = await Product.countDocuments();

    const totalCustomers = await User.countDocuments();

    // --------------------------------
    // 3. TOTAL SALES
    // Only Paid orders + selected date range
    // --------------------------------

    const salesResult = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalSales =
      salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;

    // --------------------------------
    // 4. ORDER STATUS SUMMARY
    // Selected date range
    // --------------------------------

    const orderSummaryResult = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: "$orderStatus",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const orderSummary = {
      Pending: 0,
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0,
    };

    orderSummaryResult.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(orderSummary, item._id)) {
        orderSummary[item._id] = item.count;
      }
    });

    // --------------------------------
    // 5. SALES OVERVIEW
    // Selected date range
    // --------------------------------

    const monthlySalesResult = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          sales: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    // 12 months
    const monthlySales = Array(12).fill(0);

    monthlySalesResult.forEach((item) => {
      const monthIndex = item._id.month - 1;

      monthlySales[monthIndex] = item.sales;
    });

    // --------------------------------
    // 6. RECENT ORDERS
    // Selected date range
    // --------------------------------

    const recentOrders = await Order.find({
      createdAt: {
        $gte: startDate,
      },
    })
      .populate("user")
      .populate("items.product")
      .sort({ createdAt: -1 })
      .limit(5);

    // --------------------------------
    // 7. RESPONSE
    // --------------------------------

    res.status(200).json({
      stats: {
        totalOrders,
        totalProducts,
        totalCustomers,
        totalSales,
      },

      orderSummary,

      monthlySales,

      recentOrders,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      message: "Failed to load dashboard data",
      error: error.message,
    });
  }
});


// Get all users (Customers)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orderCount = await Order.countDocuments({
          user: user._id,
        });

        return {
          ...user,
          orderCount,
        };
      })
    );

    res.status(200).json({
      users: usersWithOrders,
    });
  } catch (error) {
    console.error("Fetch users error:", error);

    res.status(500).json({
      message: "Failed to load customers",
      error: error.message,
    });
  }
});
// Get single customer with orders
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const orders = await Order.find({
      user: req.params.id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      user,
      orders,
    });
  } catch (error) {
    console.error("Fetch customer error:", error);

    res.status(500).json({
      message: "Failed to load customer",
      error: error.message,
    });
  }
});

module.exports = router;