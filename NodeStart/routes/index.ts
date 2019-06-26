import { Router } from 'express';
import authorize from './account/authorize';

var router = Router();

router.use(authorize);

export default router;
