import { BillingStatus, PaymentStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma"; // Assuming Prisma is set up and exported here
import { stripe } from "../../../shared/stripe";
import { PaymentIntent, PaymentResult } from "./payment.types";

const createPaymentIntent = async (paymentData: PaymentIntent): Promise<PaymentResult> => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(paymentData.amount * 100), // Convert to cents
        currency: paymentData.currency,
        description: paymentData.description,
        metadata: {
            userId: paymentData.userId,
            billingId: paymentData.billingId,
        },
    });

    return {
        success: true,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret as string,
    };
};

const handlePaymentSuccess = (async (paymentIntentId: string): Promise<void> => {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const { userId, billingId } = paymentIntent.metadata;

    if (!userId || !billingId) {
        throw new Error("Metadata missing userId or billingId.");
    }

    // Update the billing record
    await prisma.billing.update({
        where: { id: billingId },
        data: {
            status: BillingStatus.PAID,
            paymentId: paymentIntentId,
            updatedAt: new Date(),
        },
    });

    // Create a payment history entry
    await prisma.paymentHistory.create({
        data: {
            userId,
            billingId,
            amount: paymentIntent.amount / 100, // Convert to original currency
            paymentStatus: PaymentStatus.SUCCESS,
            paymentDate: new Date(),
            createdAt: new Date(),
        },
    });
});

const handlePaymentFailure = (async (paymentIntentId: string): Promise<void> => {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const { userId, billingId } = paymentIntent.metadata;

    if (!userId || !billingId) {
        throw new Error("Metadata missing userId or billingId.");
    }

    // Update the billing record
    await prisma.billing.update({
        where: { id: billingId },
        data: {
            status: BillingStatus.FAILED,
            paymentId: paymentIntentId,
            updatedAt: new Date(),
        },
    });

    // Create a payment history entry
    await prisma.paymentHistory.create({
        data: {
            userId,
            billingId,
            amount: paymentIntent.amount / 100, // Convert to original currency
            paymentStatus: PaymentStatus.FAILED,
            paymentDate: new Date(),
            createdAt: new Date(),
        },
    });
});

export const PaymentService = {
    createPaymentIntent,
    handlePaymentSuccess,
    handlePaymentFailure,
};
