import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "./profile.service";

const create = catchAsync(async (req, res) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;
    const result = await ProfileService.create(req.body, userId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Profile created successfully",
        data: result
    })
});

const get = catchAsync(async (req, res) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;
    const result = await ProfileService.get(userId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Profile fetched successfully",
        data: result
    })
})

const update = catchAsync(async (req, res) => {
    const result = await ProfileService.update(req.body, req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Profile updated successfully",
        data: result
    })
});
const deleteRecord = catchAsync(async (req, res) => {
    const result = await ProfileService.deleteRecord(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Profile deleted successfully",
        data: result
    })
});

export const ProfileController = {
    create,
    get,
    update,
    deleteRecord
}
