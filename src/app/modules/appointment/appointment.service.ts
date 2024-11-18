import { Appointment } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { prisma } from "../../../shared/prisma";

const createAppointment = async (
    doctorId: string,
    patientId: string,
    serviceId: string,
    date: Date,
    startTime: Date,
    endTime: Date
): Promise<Appointment> => {
    // Validate inputs
    if (!doctorId || !patientId || !serviceId) {
        throw new ApiError(400, "Doctor ID, Patient ID, and Service ID are required.");
    }

    // Validate doctor availability and check for conflicts in one transaction
    const [availability, conflict, service] = await prisma.$transaction([
        prisma.calendarAvailability.findFirst({
            where: {
                doctorId,
                date,
                startTime,
                endTime,
            },
        }),
        prisma.appointment.findFirst({
            where: {
                doctorId,
                patientId,
                date,
                startTime,
            },
        }),
        prisma.service.findUnique({
            where: {
                id: serviceId,
            },
        }),
    ]);

    // Check availability
    if (!availability) {
        throw new ApiError(400, "Doctor is not available at the requested date and time.");
    }

    // Check for conflicts
    if (conflict) {
        throw new ApiError(400, "An appointment already exists for the doctor, patient, and time.");
    }

    // Validate service
    if (!service) {
        throw new ApiError(404, "Service not found.");
    }

    // Create appointment
    const result = await prisma.appointment.create({
        data: {
            doctorId,
            patientId,
            serviceId,
            date,
            startTime,
            endTime,
            status: "PENDING", // Or set to "CONFIRMED" based on your logic
        },
    });

    return result;
};



/**
 * Retrieve a single appointment by ID
 * @param appointmentId - The ID of the appointment to retrieve
 * @returns The appointment object
 */
const getAppointmentById = async (appointmentId: string): Promise<Appointment> => {
    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: {
            patient: true,
            doctor: true,
        },
    });

    if (!appointment) {
        throw new ApiError(404, "Appointment not found.");
    }

    return appointment;
};

/**
 * Retrieve all appointments with optional filters
 * @param filters - Optional filters such as doctorId, patientId, or date range
 * @returns An array of appointments
 */
const getAllAppointments = async (filters: {
    doctorId?: string;
    patientId?: string;
    startDate?: Date;
    endDate?: Date;
}): Promise<Appointment[]> => {
    const { doctorId, patientId, startDate, endDate } = filters;

    const appointments = await prisma.appointment.findMany({
        where: {
            ...(doctorId && { doctorId }),
            ...(patientId && { patientId }),
            ...(startDate && endDate && {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            }),
        },
        include: {
            patient: true,
            doctor: true,
        },
        orderBy: {
            date: "asc",
        },
    });

    return appointments;
};



/**
 * Update an appointment by ID
 * @param appointmentId - The ID of the appointment to update
 * @param updates - The fields to update
 * @returns The updated appointment object
 */
const updateAppointment = async (
    appointmentId: string,
    updates: Partial<Appointment>
): Promise<Appointment> => {
    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
    });

    if (!appointment) {
        throw new ApiError(404, "Appointment not found.");
    }

    const updatedAppointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: updates,
    });

    return updatedAppointment;
};

/**
 * Delete an appointment by ID
 * @param appointmentId - The ID of the appointment to delete
 * @returns The deleted appointment object
 */
const deleteAppointment = async (appointmentId: string): Promise<Appointment> => {
    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
    });

    if (!appointment) {
        throw new ApiError(404, "Appointment not found.");
    }

    const deletedAppointment = await prisma.appointment.delete({
        where: { id: appointmentId },
    });

    return deletedAppointment;
};

export default {

};



export const AppointmentService = {
    create: createAppointment,
    getAppointmentById,
    getAllAppointments,
    update: updateAppointment,
    deleteRecord: deleteAppointment,
};
