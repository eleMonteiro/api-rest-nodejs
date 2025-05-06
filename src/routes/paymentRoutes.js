import {Router} from "express";
import { paymentSlip } from "../middlewares/payment.js";

const paymentRoutes = Router();

paymentRoutes.post("/boleto-pdf", paymentSlip);

export default paymentRoutes;