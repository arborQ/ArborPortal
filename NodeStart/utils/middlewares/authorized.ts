import express from 'express';
import unauthorized from '../exceptions/unauthorized';

export default function (roles?: string[]) {
    return async (request: { payload: any | null } & any, response: express.Response, next: express.NextFunction): Promise<void> => {
        console.log('is auth', request.payload);
        if (!!request.payload) {
            if(roles !== undefined) {

            }
            next();
        } else {
            next(unauthorized());
        }
    }
}