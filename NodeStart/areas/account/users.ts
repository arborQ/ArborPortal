import { Router } from 'express';
import { userRepository } from '../../repository';
import isAuthorizedMiddleware from '@bx-middlewares/authorized';

var router = Router();

router.use(isAuthorizedMiddleware([ 'users' ]));

router.get("/account/users", 
async (request, reply) => {
    const items = await userRepository.find();
    reply
        .status(200)
        .send({ items, totalCount: items.length });
});

router.get('/account/users/edit/:id', async (request, reply) => {
    const { id } = request.params;
    const userDb = await userRepository.findById(id);

    reply.send(userDb);
});

router.patch('/account/users/edit/:id', isAuthorizedMiddleware([ 'updateUser' ]), async (request, reply) => {
    const { id } = request.params;
    const { roles, isActive } = request.body;
    const userDb = await userRepository.update(id, { roles, isActive: !!isActive })

    reply.send(userDb);
});

export default router;
