// src/types/payment.types.ts
export interface PaymentIntent {
    amount: number;
    currency: string;
    description?: string;
    userId: string;
    billingId: string;
}

export interface PaymentResult {
    success: boolean;
    paymentIntentId?: string;
    clientSecret?: string;
    error?: string;
}