import { Router } from 'express';
import { verify, sign } from 'jsonwebtoken';
import { jwt, app } from '../../config';
var router = Router();
const auth0Key = jwt.auth0TokenKey;

router.post("/account/authorize", (request, reply) => {
    const { token } = request.body;
    try {
        const payload: any = verify(token, auth0Key, { algorithms: ['RS256'] });
        console.log({payload});
        if (!!payload) {
            const token = sign({ 
                userId: 123, 
                firstName: payload.given_name, 
                lastName: payload.family_name,
                nickname: payload.nickname,
                picture: payload.picture, 
                email: '?????',
                claims: [{ type: 'UserClaims', value: 1 }]
            }, jwt.tokenKey);

            reply
                .status(200)
                .cookie(app.authCookieName, token, { maxAge: 86400 })
                .send({
                    isSuccess: true,
                    token,
                });
        }
    } catch (error) {
        reply.send({
            isSuccess: false,
            error
        });
    }

});

export default router;
