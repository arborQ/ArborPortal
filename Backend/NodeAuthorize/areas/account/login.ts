import { Router } from 'express';
import express from 'express';
import newGuid from 'uuid/v4';
import { sign } from 'jsonwebtoken';
import { jwt } from '../../config';

var router = Router();

router.post("/", async (request: express.Request, reply, next) => {
    const { login, password } = request.body;
    console.log({ login, password })
    if (login === 'admin' && password === 'admin'){
            const newPayload = {
                nameid: -1,
                email: 'admin@admin.pl',
                unique_name: 'admin',
                sessionKey: newGuid(),
                role: ['admin'],
            };

            const token = sign(newPayload, jwt.privateTokenKey);

            reply
                .status(200)
                .send({
                    token,
                });
    }
    else {
        reply.status(400).send();
    }

    // try {
    //     const payload: any = verify(token, auth0Key, { algorithms: ['RS256'] });
    //     if (!!payload) {
    //         const userData = convertPayloadToUser(payload);
    //         const info = getLoginInfo(request);
    //         const dbUserData = await userRepository.storeNewExternalLogin({
    //             ...userData,
    //             roles: ['regular']
    //         }, info);

    //         LogInfo(`NodeAuthorize: External token authorized: ${userData.login || userData.email}`);
    //         await notifyNewUser(userData);

    //         const newPayload = {
    //             nameid: dbUserData._id,
    //             email: dbUserData.email,
    //             unique_name: dbUserData.login,
    //             sessionKey: info.sessionKey,
    //             role: dbUserData.roles,
    //             exp: payload.exp,
    //             iat: payload.iat
    //         };

    //         await blackListedSessions.set(newPayload.sessionKey, payload.exp);

    //         const token = sign(newPayload, jwt.privateTokenKey);

    //         reply
    //             .status(200)
    //             .send({
    //                 token,
    //             });
    //     }
    // } catch (error) {
    //     LogError(`NodeAuthorize: External token authorize Failed`);
    //     next(error);
    // }
});

export default router;
