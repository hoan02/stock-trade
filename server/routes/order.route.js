import express from "express";
import { getAllOrder, createOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getAllOrder);
router.post("/", createOrder);

export default router;