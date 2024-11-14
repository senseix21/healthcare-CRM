import { Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CalendarAvailabilityService } from "./calenderAvailablity.service";

const create = catchAsync(async (req: Request, res: Response) => {
    // Get the access token from headers
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const doctorId = decodedToken.userId;

    // Create CalendarAvailability using the service
    const result = await CalendarAvailabilityService.create(req.body, doctorId);

    // SendResponse
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Calendar availability created successfully",
        data: result
    });
});

// Get CalendarAvailability entries for a doctor
const get = catchAsync(async (req: Request, res: Response) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const doctorId = decodedToken.userId;

    const { date } = req.query as any;
    const availability = await CalendarAvailabilityService.get(doctorId, date);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Calendar availability fetched successfully",
        data: availability
    });
});

// Update CalendarAvailability entry by ID
const update = catchAsync(async (req: Request, res: Response) => {
    const { availabilityId } = req.params;

    const updatedAvailability = await CalendarAvailabilityService.update(availabilityId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Calendar availability updated successfully",
        data: updatedAvailability
    });
});

// Delete CalendarAvailability entry by ID
const deleteAvailability = catchAsync(async (req: Request, res: Response) => {
    const { availabilityId } = req.params;

    const deletedAvailability = await CalendarAvailabilityService.deleteRecord(availabilityId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Calendar availability deleted successfully",
        data: deletedAvailability
    });
});

export const CalendarAvailabilityController = {
    create,
    update,
    get,
    delete: deleteAvailability

};
