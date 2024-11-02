import { User } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import { passCompare } from "../../../helpers/passCompare";
import { prisma } from "../../../shared/prisma";
import { ILoginResponse, ILoginUser } from "./auth.interface";

// Instantiate the OAuth2 client with your Google Client ID
const client = new OAuth2Client(config.google.clientId);

const googleSignIn = async (idToken: string): Promise<ILoginResponse> => {
    // Verify the ID token with Google's OAuth2 client
    const ticket = await client.verifyIdToken({
        idToken,
        audience: config.google.clientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Google token");
    }

    const { email, sub: googleId, name } = payload;

    // Check if user already exists in the database
    let user = await prisma.user.findFirst({
        where: {
            googleId: googleId,
        },
    });

    // If user does not exist, create a new user record
    if (!user) {
        user = await prisma.user.create({
            data: {
                email,
                role: "PATIENT", // Default role, adjust based on your application logic
                provider: "GOOGLE", // Track the provider
                googleId,          // Save Google ID
            },
        });
    } else if (!user.googleId) {
        // If the user exists but googleId is missing, update the user record
        user = await prisma.user.update({
            where: { email },
            data: { googleId },
        });
    }

    // Create access token for the user
    const token = jwtHelpers.createToken(
        { userId: user.id, role: user.role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        role: user.role,
        token,
    };
};



const signUp = async (payload: User) => {
    console.log('first')
    const { email } = payload;

    const isUserExist = await prisma.user.findFirst({
        where: {
            email: email,
        }
    });
    if (isUserExist) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User already exists!");
    }

    const result = await prisma.user.create({ data: payload })
    return result;
}

const login = async (payload: ILoginUser): Promise<ILoginResponse> => {
    const { email, password } = payload;

    const isUserExist = await prisma.user.findFirst({
        where: {
            email: email,
        }
    });
    if (!isUserExist) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User does not exist");
    }

    if (
        isUserExist.password &&
        !(await passCompare(password, isUserExist.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }

    //create acess and refresh token 
    const { id: userId, role: role, } = isUserExist
    const token = jwtHelpers.createToken(
        { userId, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    )

    return {
        role,
        token
    }
}

export const Authservice = {
    signUp,
    login,
    googleSignIn,
};