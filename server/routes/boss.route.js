import express from "express";
import { getMoneyBoss } from "../controllers/boss.controller.js";

const router = express.Router();

router.get("/money", getMoneyBoss);
// router.post("/", createOrder);

export default router;