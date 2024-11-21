// src/repositories / payment - history.repository.ts
import { PaymentHistory } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createPaymentHistory = async (data: PaymentHistory) => {
    const result = prisma.paymentHistory.create({
        data: {
            userId: data.userId,
            billingId: data.billingId,
            amount: data.amount,
            paymentStatus: data.paymentStatus,
            paymentDate: data.paymentDate,
        },
    });

    return result;
};

export const PaymentHistoryRepository = {
    createPaymentHistory,
};