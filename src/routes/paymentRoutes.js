import { Router } from "express";
import { paymentSlip } from "../middlewares/payment.js";

const paymentRoutes = Router();

paymentRoutes.post("/slip-pdf", paymentSlip);

export default paymentRoutes;
