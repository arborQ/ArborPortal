import { Router } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { jwt } from '../../config';
var router = Router();

router.post("/account/authorize", (request, reply) => {
    const { token } = request.body;
    try {
        const payload = verify(token, jwt.tokenKey);

        reply
            .status(200).cookie('NodeAuthToken', 'lololololol', { maxAge: 86400 })
            .send({
                isSuccess: true,
                payload,
            });
    } catch {
        reply.send({
            isSuccess: false,
        });
    }

});

export default router;
