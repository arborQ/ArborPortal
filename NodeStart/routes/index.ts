import { Router } from 'express';
import authorize from './account/authorize';
import users from './account/users';

var router = Router();

router.use(authorize);
router.use(users);

export default router;
