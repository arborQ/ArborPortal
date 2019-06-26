import { Router } from 'express';
import { decode, verify } from 'jsonwebtoken';
import  * as passport from 'passport';
import { Strategy } from 'passport-local';
import { jwt } from '../../config';

var router = Router();

passport.use(new Strategy((username, password, done) => {
    console.log({username, password, done});

    done(null, { user: 1});
}));

router.post("/account/authorize", (request, reply) => {
    const { token } = request.body;
    try {
        const payload = verify(token, jwt.tokenKey);
        passport.authenticate('local');
        request.session.save(() => {
            reply.send({
                isSuccess: true,
                payload,
            });
        });
    } catch {
        reply.send({
            isSuccess: false,
        });
    }
    
});

export default router;
