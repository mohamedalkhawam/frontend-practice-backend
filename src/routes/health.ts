import {Router} from 'express';
import type {Request, Response} from 'express';
export const router = Router();
router.get('/', (_req: Request, res: Response) => res.json({status: 'ok'}));


