import { Router } from 'express';
import authorize from './account/authorize';
import users from './account/users';
import login from './account/login';

var router = Router();

router.use('/account/authorize', authorize);
router.use('/account/users', users);
router.use('/account/login', login);

export default router;
