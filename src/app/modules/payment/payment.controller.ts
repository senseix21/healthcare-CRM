// src/controllers/payment.controller.ts
import { Request, Response } from 'express';
import Stripe from 'stripe';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { stripe } from '../../../shared/stripe';
import { PaymentService } from './payment.service';

// Controller to create a payment intent
const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const { amount, currency, description, userId, billingId } = req.body;

    // Create the payment intent using the service
    const result = await PaymentService.createPaymentIntent({
        amount,
        currency,
        description,
        userId,
        billingId,
    });

    // Respond with the result
    sendResponse(res, {
        success: result.success,
        statusCode: result.success ? 200 : 400,
        message: result.success
            ? "Payment intent created successfully"
            : result.error || "Failed to create payment intent",
        data: result,
    });
});



export const handleWebhook = (async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;

    // Import the Stripe configuration dynamically

    let event: Stripe.Event;

    try {
        // Construct the Stripe event
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            config.stripe.webhookSecret
        );
    } catch (error) {
        // Handle signature validation errors
        return res.status(400).json({
            error: error instanceof Error ? error.message : "Webhook signature verification failed",
        });
    }

    // Handle the event based on its type
    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await PaymentService.handlePaymentSuccess(paymentIntent.id);
                break;
            }
            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await PaymentService.handlePaymentFailure(paymentIntent.id);
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Send success response to Stripe
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Webhook event processed successfully",
        });
    } catch (error) {
        // Handle other errors
        res.status(500).json({
            error: error instanceof Error ? error.message : "Error processing webhook event",
        });
    }
});

export const PaymentController = {
    createPaymentIntent,
    handleWebhook,
};
