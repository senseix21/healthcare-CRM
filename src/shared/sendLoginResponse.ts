import { Response } from 'express';

type IApiReponse = {
    success: boolean;
    statusCode: number;
    message?: string | null;
    role?: string
    token?: string
};


const sendLoginResponse = (res: Response, data: IApiReponse): void => {
    const responseData: IApiReponse = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        role: data.role || null || undefined,
        token: data.token || null || undefined
    };

    res.status(data.statusCode).json(responseData);
}

export default sendLoginResponse;