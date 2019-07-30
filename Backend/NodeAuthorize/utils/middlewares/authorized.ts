import express from 'express';
import unauthorized from '../exceptions/unauthorized';
import { blackListedSessions } from '@bx-cache';

export default function (roles?: string[]) {
    return async (request: { payload: any | null } & any, response: express.Response, next: express.NextFunction): Promise<void> => {
        if (!!request.payload || !!request.payload.sessionKey) {
            const isBlacklisted = await blackListedSessions.contains(request.payload.sessionKey);
            if (isBlacklisted) {
                next(unauthorized(`Session expired`));
            }
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