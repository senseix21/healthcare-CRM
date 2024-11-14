import { MedicalHistory } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { prisma } from "../../../shared/prisma";
import { getPatientIdByUserId } from "../../../utils/getById";

const create = async (payload: MedicalHistory, userId: string) => {
    try {

        const patientId = await getPatientIdByUserId(userId);
        // Check if the medicalHistory already exists for the user
        const existingMedicalHistory = await prisma.medicalHistory.findFirst({
            where: {
                patientId: patientId
            }
        });

        if (existingMedicalHistory) {
            throw new ApiError(403, "Medical History profile already exists for this user");
        }

        const result = await prisma.medicalHistory.create({
            data: {
                ...payload,
                patientId: patientId
            }
        });
        return result;

    } catch (error: any) {
        console.error("Error creating medical History profile:", error);
        throw new ApiError(403, error);
    }
}

const get = async (payload: string) => {
    try {
        const patientId = await getPatientIdByUserId(payload);
        const medicalHistory = await prisma.medicalHistory.findFirst({
            where: { patientId: patientId }
        });

        if (!medicalHistory) {
            throw new ApiError(404, "medical History profile not found");
        }

        return medicalHistory;

    } catch (error: any) {
        console.error("Error getting medical History profile:", error);
        throw new ApiError(500, error);
    }
}

const update = async (payload: Partial<MedicalHistory>, id: string) => {
    try {
        const updatedmedicalHistory = await prisma.medicalHistory.update({
            where: { id: id },
            data: payload
        });
        return updatedmedicalHistory;
    } catch (error: any) {
        console.error("Error updating medical History profile:", error);
        throw new ApiError(500, error);
    }
};

const deleteRecord = async (payload: string) => {
    try {
        const result = await prisma.medicalHistory.delete({
            where: { id: payload }
        });
        return result;
    } catch (error: any) {
        console.error("Error deleting medicalHistory profile:", error);
        throw new ApiError(500, error);
    }
}



export const MedicalHistoryService = {
    create,
    update,
    get,
    deleteRecord
}