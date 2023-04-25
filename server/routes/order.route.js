import express from "express";
import { getAllOrder, createOrder, getMyOrder, getMyOrderById, cancelMyOrderById } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getAllOrder);
router.get("/my-orders", verifyToken, getMyOrder);
router.get("/my-orders/:id", verifyToken, getMyOrderById);
router.put("/my-orders/:id", verifyToken, cancelMyOrderById);
router.post("/", verifyToken, createOrder);

export default router;