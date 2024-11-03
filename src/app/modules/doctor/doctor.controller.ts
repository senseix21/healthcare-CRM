import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorService } from "./doctor.service";

const create = catchAsync(async (req, res) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;

    const result = await DoctorService.create(req.body, userId);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Doctor created successfully",
        data: result
    });
});

const get = catchAsync(async (req, res) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;

    const result = await DoctorService.get(userId)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Doctor retrieved successfully",
        data: result
    })
})

const update = catchAsync(async (req, res) => {

    const result = await DoctorService.update(req.body, req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Doctor profile updated successfully",
        data: result
    });
});

const deleteRecord = catchAsync(async (req, res) => {
    const result = await DoctorService.deleteRecord(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Doctor profile deleted successfully",
        data: result
    });
});

export const DoctorController = {
    create,
    get,
    update,
    deleteRecord
}
