import { Router } from 'express';
import { getDocsController } from './docsControllers';

const router = Router();

router.get(
  '/',
  getDocsController,
);

export { router as docsRoutes }
;
