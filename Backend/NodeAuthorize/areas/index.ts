import { Router } from 'express';
import authorize from './account/authorize';
import users from './account/users';

var router = Router();

router.use('/account/authorize', authorize);
router.use('/account/users', users);

export default router;
