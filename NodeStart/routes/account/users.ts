import { Router } from 'express';
import { userRepository } from '../../repository';

var router = Router();

router.get("/account/users", async (request, reply) => {
    const items = await userRepository.find();
    reply
        .status(200)
        .send({ items, totalCount: items.length });
});

export default router;
