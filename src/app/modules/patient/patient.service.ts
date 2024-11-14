import { Patient } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { prisma } from "../../../shared/prisma";

const create = async (payload: Patient, userId: string) => {
    try {
        // Check if the Patient already exists for the user
        const existingPatient = await prisma.patient.findUnique({
            where: {
                userId: userId
            }
        });

        if (existingPatient) {
            throw new ApiError(403, "Patient profile already exists for this user");
        }

        const result = await prisma.patient.create({
            data: { ...payload, userId }
        });
        return result;

    } catch (error: any) {
        console.error("Error creating Patient profile:", error);
        throw new ApiError(403, error);
    }
}

const get = async (payload: string) => {
    try {
        const Patient = await prisma.patient.findUnique({
            where: { userId: payload }
        });

        if (!Patient) {
            throw new ApiError(404, "Patient profile not found");
        }

        return Patient;

    } catch (error: any) {
        console.error("Error getting Patient profile:", error);
        throw new ApiError(500, error);
    }
}

const update = async (payload: Partial<Patient>, id: string) => {
    try {
        const updatedPatient = await prisma.patient.update({
            where: { id: id },
            data: payload
        });
        return updatedPatient;
    } catch (error: any) {
        console.error("Error updating Patient profile:", error);
        throw new ApiError(500, error);
    }
};

const deleteRecord = async (payload: string) => {
    try {
        const result = await prisma.patient.delete({
            where: { id: payload }
        });
        return result;
    } catch (error: any) {
        console.error("Error deleting Patient profile:", error);
        throw new ApiError(500, error);
    }
}



export const PatientService = {
    create,
    update,
    get,
    deleteRecord
}