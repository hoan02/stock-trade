import express from "express";
import { getMoneySever } from "../controllers/serverInfo.controller.js";

const router = express.Router();

router.get("/info/money", getMoneySever);
// router.post("/", createOrder);

export default router;