import express from 'express';
import { jwt } from '../../config';
import { verify } from 'jsonwebtoken';

export default function (suffix: string = 'Bearer '): express.RequestHandler {
    return async function (request: any, response: express.Response, next: express.NextFunction): Promise<void> {
        const authorizationToken = request.header('Authorization');

        if (!!authorizationToken) {
            const jwtToken = authorizationToken.substr(suffix.length, authorizationToken.length - suffix.length);

            try {
                const payload: any = verify(jwtToken, jwt.privateTokenKey);

                if (!!payload) {
                    request.payload = payload;
                } else {
                    request.payload = null;
                }

            } catch (err) {
                request.payload = null;
                console.log(err)
            }
        }

        next();
    }
}