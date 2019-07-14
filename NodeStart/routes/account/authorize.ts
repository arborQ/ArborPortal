import { Router } from 'express';
import { verify, sign } from 'jsonwebtoken';
import { jwt, app } from '../../config';

var router = Router();
const auth0Key = jwt.auth0TokenKey;

router.post("/account/authorize", (request, reply) => {
    const { token } = request.body;

    try {
        const payload: any = verify(token, auth0Key, { algorithms: ['RS256'] });

        if (!!payload) {
            const newPayload = {
                nameid: "12345",
                email: "arbor@o2.pl",
                unique_name: "Łukasz Wójcik",
                role: [
                    "admin",
                    "reciper",
                    "userlist"
                ],
                exp: payload.exp,
                iat: payload.iat
            };
            const token = sign(newPayload, jwt.privateTokenKey);

            reply
                .status(200)
                .cookie(app.authCookieName, token, { maxAge: 86400 })
                .send({
                    token,
                });
        }
    } catch (error) {
        reply.send({
            error
        });
    }

});

export default router;
