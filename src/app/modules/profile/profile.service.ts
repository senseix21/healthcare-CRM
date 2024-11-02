import { Profile } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { prisma } from "../../../shared/prisma";

const create = async (payload: Profile, userId: string) => {
    try {
        // Check if the profile already exists for the user
        const existingProfile = await prisma.profile.findUnique({
            where: { userId: userId }
        });

        if (existingProfile) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Profile already exists for this user");
        }

        const result = await prisma.profile.create({
            data: payload
        });
        return result;

    } catch (error) {
        console.error("Error creating profile:", error);
        throw new ApiError(httpStatus.BAD_REQUEST, "Profile creation failed");
    }
}

export const ProfileService = {
    create
}
