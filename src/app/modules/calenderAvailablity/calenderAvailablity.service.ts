import { CalendarAvailability } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { prisma } from "../../../shared/prisma";
import { getDoctorIdByUserId } from "../../../utils/getById";

const create = async (payload: CalendarAvailability, userId: string) => {
    try {
        const { date, startTime, endTime } = payload;

        // Retrieve doctorId based on userId
        const doctorId = await getDoctorIdByUserId(userId);

        // Check if the CalendarAvailability already exists for the doctor on the specific date and time
        const existingCalendarAvailability = await prisma.calendarAvailability.findFirst({
            where: {
                doctorId: doctorId,
                date: date,
                OR: [
                    {
                        startTime: {
                            lte: endTime // Starts before or at the requested end time
                        },
                        endTime: {
                            gte: startTime // Ends after or at the requested start time
                        }
                    }
                ]
            }
        });

        if (existingCalendarAvailability) {
            throw new ApiError(403, "Calendar Availability profile already exists for this doctor on the specified date and time");
        }

        const result = await prisma.calendarAvailability.create({
            data: {
                ...payload,
                doctorId: doctorId
            }
        });
        return result;

    } catch (error: any) {
        console.error("Error creating Calendar Availability profile:", error);
        throw new ApiError(403, error.message || "Error creating Calendar Availability profile");
    }
}


const get = async (userId: string, date: Date) => {
    try {
        // Retrieve doctorId based on userId
        const doctorId = await getDoctorIdByUserId(userId);

        const availability = await prisma.calendarAvailability.findMany({
            where: {
                doctorId: doctorId,
                date: date,
            },
            orderBy: {
                startTime: 'asc' // Orders the time slots in ascending order by start time
            }
        });

        if (!availability || availability.length === 0) {
            throw new ApiError(404, "No availability found for this doctor on the specified date");
        }

        return availability;

    } catch (error: any) {
        console.error("Error retrieving Calendar Availability:", error);
        throw new ApiError(500, error.message || "Error retrieving Calendar Availability");
    }
};

const update = async (availabilityId: string, updatedData: Partial<CalendarAvailability>) => {
    try {

        const { doctorId, date, startTime, endTime } = updatedData;

        // Ensure the updatedData contains all necessary fields
        if (!doctorId || !date || !startTime || !endTime) {
            throw new ApiError(400, "Missing required fields for updating availability");
        }

        // Check if the new times overlap with any existing availability for the doctor on the same date
        const conflictingAvailability = await prisma.calendarAvailability.findFirst({
            where: {
                doctorId: doctorId,
                date: date,
                // id: { not: availabilityId }, // Exclude the current record being updated
                OR: [
                    {
                        startTime: {
                            lte: endTime // Starts before or at the requested end time
                        },
                        endTime: {
                            gte: startTime // Ends after or at the requested start time
                        }
                    }
                ]
            }
        });

        if (conflictingAvailability) {
            throw new ApiError(403, "Conflicting availability exists for the specified date and time");
        }

        // Proceed with updating the availability
        const updatedAvailability = await prisma.calendarAvailability.update({
            where: { id: availabilityId },
            data: {
                ...updatedData,
                updatedAt: new Date() // Update timestamp for modification tracking
            }
        });

        return updatedAvailability;

    } catch (error: any) {
        console.error("Error updating Calendar Availability:", error);
        throw new ApiError(500, error.message || "Error updating Calendar Availability");
    }
};


const deleteRecord = async (availabilityId: string) => {
    try {
        // Check if the CalendarAvailability entry exists
        const existingAvailability = await prisma.calendarAvailability.findUnique({
            where: { id: availabilityId }
        });

        if (!existingAvailability) {
            throw new ApiError(404, "Calendar Availability not found");
        }

        // Delete the CalendarAvailability entry
        const deletedAvailability = await prisma.calendarAvailability.delete({
            where: { id: availabilityId }
        });

        return deletedAvailability;

    } catch (error: any) {
        console.error("Error deleting Calendar Availability:", error);
        throw new ApiError(500, error.message || "Error deleting Calendar Availability");
    }
};




export const CalendarAvailabilityService = {
    create,
    update,
    get,
    deleteRecord
}