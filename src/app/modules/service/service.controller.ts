import { Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ServiceService } from "./service.service";

const createService = catchAsync(async (req: Request, res: Response) => {

    // Extract and verify the access token
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;

    // Extract service details from the request body
    const { name, description, price, duration } = req.body;

    // Call the service to create a new service
    const result = await ServiceService.create({ name, description, price, duration, doctorId: userId });

    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Service created successfully",
        data: result,
    });
});

const getAllServices = catchAsync(async (_req: Request, res: Response) => {
    // Call the service to get all services
    const result = await ServiceService.getAll();

    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Services retrieved successfully",
        data: result,
    });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
    // Extract service ID from request parameters
    const { id } = req.params;

    // Call the service to get the service by ID
    const result = await ServiceService.getById(id);


    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Service retrieved successfully",
        data: result,
    });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
    // Extract service ID from request parameters
    const { id } = req.params;

    // Extract updated details from the request body
    const { name, description, price, duration } = req.body;

    // Call the service to update the service
    const result = await ServiceService.update(id, { name, description, price, duration });

    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Service updated successfully",
        data: result,
    });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
    // Extract service ID from request parameters
    const { id } = req.params;

    // Call the service to delete the service
    const result = await ServiceService.deleteService(id);

    // Send the response
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Service deleted successfully",
        data: result,
    });
});

export const ServiceController = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};
