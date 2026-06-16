const express = require("express");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/my", auth, getMyOrders);
router.get("/admin/all", auth, admin, getAllOrders);
router.patch("/admin/:id/status", auth, admin, updateOrderStatus);

module.exports = router;