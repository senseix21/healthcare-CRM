import { Service } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { prisma } from "../../../shared/prisma";

const create = async (data: {
    name: string;
    description?: string;
    price: number;
    duration: number;
    doctorId: string;
}): Promise<Service> => {
    try {
        // Validate if the doctor exists
        const doctor = await prisma.doctor.findUnique({
            where: { id: data.doctorId },
        });

        if (!doctor) {
            throw new ApiError(404, "Doctor not found.");
        }

        // Create the service associated with the doctor
        const result = await prisma.service.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                duration: data.duration,
                doctorId: data.doctorId, // Link the service to the doctor
            },
        });

        return result;
    } catch (error: any) {
        throw new ApiError(500, error);
    }
};


const getAll = async (): Promise<Service[]> => {
    try {
        const result = await prisma.service.findMany();
        return result;
    } catch (error) {
        throw new ApiError(500, "Failed to fetch services. Please try again later.");
    }
};

const getById = async (id: string): Promise<Service | null> => {
    try {
        const result = await prisma.service.findUnique({ where: { id } });

        if (!result) {
            throw new ApiError(404, "Service not found.");
        }

        return result;
    } catch (error) {
        throw new ApiError(500, "Failed to fetch the service. Please try again later.");
    }
};

const update = async (
    id: string,
    data: { name?: string; description?: string; price?: number; duration?: number }
): Promise<Service | null> => {
    try {
        const existingService = await prisma.service.findUnique({ where: { id } });

        if (!existingService) {
            throw new ApiError(404, "Service not found.");
        }

        const result = await prisma.service.update({
            where: { id },
            data,
        });

        return result;
    } catch (error) {
        throw new ApiError(500, "Failed to update the service. Please try again later.");
    }
};

const deleteService = async (id: string): Promise<Service | null> => {
    try {
        const existingService = await prisma.service.findUnique({ where: { id } });

        if (!existingService) {
            throw new ApiError(404, "Service not found.");
        }

        const result = await prisma.service.delete({ where: { id } });
        return result;
    } catch (error) {
        throw new ApiError(500, "Failed to delete the service. Please try again later.");
    }
};

export const ServiceService = {
    create,
    getAll,
    getById,
    update,
    deleteService,
};
