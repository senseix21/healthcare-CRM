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
            throw new ApiError(403, "Profile already exists for this user");
        }

        const result = await prisma.profile.create({
            data: { ...payload, userId }
        });
        return result;

    } catch (error: any) {
        console.error("Error creating profile:", error);
        throw new ApiError(403, error);
    }
}

const get = async (payload: string) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: { userId: payload }
        });

        if (!profile) {
            throw new ApiError(404, "Profile not found");
        }

        return profile;

    } catch (error: any) {
        console.error("Error getting profile:", error);
        throw new ApiError(500, error);
    }
}

const update = async (payload: Partial<Profile>, id: string) => {
    try {
        const updatedProfile = await prisma.profile.update({
            where: { id: id },
            data: payload
        });
        return updatedProfile;
    } catch (error: any) {
        console.error("Error updating profile:", error);
        throw new ApiError(500, error);
    }
}

const deleteRecord = async (payload: string) => {
    try {
        const result = await prisma.profile.delete({
            where: { id: payload }
        });
        return result;
    } catch (error: any) {
        console.error("Error deleting profile:", error);
        throw new ApiError(500, error);
    }
}

export const ProfileService = {
    create,
    get,
    update,
    deleteRecord
}

