import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MedicalHistoryService } from "./medicalHistory.service";

const create = catchAsync(async (req, res) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;

    const result = await MedicalHistoryService.create(req.body, userId);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "MedicalHistory created successfully",
        data: result
    });
});

const get = catchAsync(async (req, res) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;

    const result = await MedicalHistoryService.get(userId)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "MedicalHistory retrieved successfully",
        data: result
    })
})

const update = catchAsync(async (req, res) => {

    const result = await MedicalHistoryService.update(req.body, req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "MedicalHistory profile updated successfully",
        data: result
    });
});

const deleteRecord = catchAsync(async (req, res) => {
    const result = await MedicalHistoryService.deleteRecord(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "MedicalHistory profile deleted successfully",
        data: result
    });
});

export const MedicalHistoryController = {
    create,
    get,
    update,
    deleteRecord
}