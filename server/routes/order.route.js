import express from "express";
import { getAllOrder, createOrder, getMyOrder } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getAllOrder);
router.get("/my-orders", verifyToken, getMyOrder);
router.post("/", verifyToken, createOrder);

export default router;