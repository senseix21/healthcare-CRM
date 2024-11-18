import { Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";

/**
 * Controller to handle creating an appointment
 */
const createAppointment = catchAsync(async (req: Request, res: Response) => {
    // Extract and verify the access token
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;

    // Extract the appointment details from the request body
    const { doctorId, date, startTime, endTime } = req.body;

    // Call the service to create an appointment
    const result = await AppointmentService.create(
        doctorId,
        userId,
        date,
        startTime,
        endTime
    );

    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Appointment created successfully",
        data: result,
    });
});

/**
 * Controller to fetch a single appointment by ID
 */
const getSingleAppointment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params; // Extract appointment ID from route parameters

    // Fetch the appointment using the service
    const result = await AppointmentService.getAppointmentById(id);

    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Appointment retrieved successfully",
        data: result,
    });
});

/**
 * Controller to fetch all appointments
 */
const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
    const { doctorId, patientId } = req.query; // Extract filters if provided

    // Fetch appointments using the service
    const result = await AppointmentService.getAllAppointments({
        doctorId: doctorId as string,
        patientId: patientId as string,
    });

    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Appointments retrieved successfully",
        data: result,
    });
});

/**
 * Controller to update an appointment
 */
const updateAppointment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params; // Extract appointment ID from route parameters
    const updateData = req.body; // Extract update data from request body

    // Update the appointment using the service
    const result = await AppointmentService.update(id, updateData);

    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Appointment updated successfully",
        data: result,
    });
});

/**
 * Controller to delete an appointment
 */
const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params; // Extract appointment ID from route parameters

    // Delete the appointment using the service
    await AppointmentService.deleteRecord(id);

    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Appointment deleted successfully",
    });
});

export const AppointmentController = {
    create: createAppointment,
    getSingle: getSingleAppointment,
    getAll: getAllAppointments,
    update: updateAppointment,
    delete: deleteAppointment,

};


