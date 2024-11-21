import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

// Route to create a payment intent
router.post("/create-intent", PaymentController.createPaymentIntent);

// Webhook for Stripe payment events
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res, next) => {
        try {
            await PaymentController.handleWebhook(req, res);
        } catch (error) {
            next(error);
        }
    }
);

export const PaymentRoutes = router;
