import express from 'express';
import unauthorized from '../exceptions/unauthorized';

export default function (roles?: string[]) {
    return async (request: { payload: any | null } & any, response: express.Response, next: express.NextFunction): Promise<void> => {
        if (!!request.payload) {
            if (roles !== undefined) {
                const userRoles: string[] = request.payload.role;
                const missingRoles = roles.reduce<string[]>((alreadyMissing, role) => {
                    if (!userRoles.find(r => r === role)) {
                        return [...alreadyMissing, role];
                    }
                    return alreadyMissing;
                }, []);

                if (missingRoles.length > 0) {
                    next(unauthorized(`Missing roles: ${missingRoles.join(',')}`));
                }
            }
            next();
        } else {
            next(unauthorized());
        }
    }
}