import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password } = req.body;
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        next();

    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
};