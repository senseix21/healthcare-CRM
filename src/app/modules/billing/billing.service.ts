// src/repositories/billing.repository.ts
import { BillingStatus } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

interface BillingUpdateData {
    status: BillingStatus;
    paymentId: string;
}

const updateBillingStatus = async (
    billingId: string,
    updateData: BillingUpdateData
) => {
    return prisma.billing.update({
        where: { id: billingId },
        data: {
            status: updateData.status,
            paymentId: updateData.paymentId,
            updatedAt: new Date(),
        },
    });
};

export const BillingRepository = {
    updateBillingStatus,
};