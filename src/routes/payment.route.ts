import express from "express";
import { createPaymentIntent } from "../controllers/payment.controller";
const router = express.Router();

router.post("/", createPaymentIntent);

export default router;
