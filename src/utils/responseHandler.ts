import { Response } from 'express';

export const successResponse = (res: Response, data: any, message: string = 'Success') => {
    res.status(200).json({
        status: 'success',
        message,
        data
    });
};

export const errorResponse = (res: Response, message: string = 'Something went wrong', statusCode: number = 500) => {
    res.status(statusCode).json({
        status: 'error',
        message
    });
};
