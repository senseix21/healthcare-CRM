import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PatientService } from "./patient.service";

const create = catchAsync(async (req, res) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;

    const result = await PatientService.create(req.body, userId);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Patient created successfully",
        data: result
    });
});

const get = catchAsync(async (req, res) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;

    const result = await PatientService.get(userId)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Patient retrieved successfully",
        data: result
    })
})

const update = catchAsync(async (req, res) => {

    const result = await PatientService.update(req.body, req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Patient profile updated successfully",
        data: result
    });
});

const deleteRecord = catchAsync(async (req, res) => {
    const result = await PatientService.deleteRecord(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Patient profile deleted successfully",
        data: result
    });
});

export const PatientController = {
    create,
    get,
    update,
    deleteRecord
}
