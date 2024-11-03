import { Doctor } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { prisma } from "../../../shared/prisma";

const create = async (payload: Doctor, userId: string) => {
    try {
        // Check if the doctor already exists for the user
        const existingDoctor = await prisma.doctor.findUnique({
            where: {
                userId: userId
            }
        });

        if (existingDoctor) {
            throw new ApiError(403, "Doctor profile already exists for this user");
        }

        const result = await prisma.doctor.create({
            data: { ...payload, userId }
        });
        return result;

    } catch (error: any) {
        console.error("Error creating doctor profile:", error);
        throw new ApiError(403, error);
    }
}

const get = async (payload: string) => {
    try {
        const doctor = await prisma.doctor.findUnique({
            where: { userId: payload }
        });

        if (!doctor) {
            throw new ApiError(404, "Doctor profile not found");
        }

        return doctor;

    } catch (error: any) {
        console.error("Error getting doctor profile:", error);
        throw new ApiError(500, error);
    }
}

const update = async (payload: Partial<Doctor>, id: string) => {
    try {
        const updatedDoctor = await prisma.doctor.update({
            where: { id: id },
            data: payload
        });
        return updatedDoctor;
    } catch (error: any) {
        console.error("Error updating doctor profile:", error);
        throw new ApiError(500, error);
    }
};

const deleteRecord = async (payload: string) => {
    try {
        const result = await prisma.doctor.delete({
            where: { id: payload }
        });
        return result;
    } catch (error: any) {
        console.error("Error deleting doctor profile:", error);
        throw new ApiError(500, error);
    }
}



export const DoctorService = {
    create,
    update,
    get,
    deleteRecord
}