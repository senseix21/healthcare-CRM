import ApiError from "../errors/ApiError";
import { prisma } from "../shared/prisma";

// Utility to retrieve doctorId from userId
export const getDoctorIdByUserId = async (userId: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: { userId: userId }
    });

    if (!doctor) {
        throw new ApiError(404, "Doctor not found for the provided user ID");
    }

    return doctor.id;
};

export const getPatientIdByUserId = async (userId: string) => {
    const patient = await prisma.doctor.findUnique({
        where: { userId: userId }
    });

    if (!patient) {
        throw new ApiError(404, "Patient not found for the provided user ID");
    }

    return patient.id;
};
