import { Router } from 'express';

var router = Router();

router.get("/account/users", (request, reply) => {
    reply
        .status(200)
        .send({ items: [], totalCount: 0 });
});

export default router;
