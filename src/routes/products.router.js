import { Router } from 'express';
import { productsController } from '../controllers/products.controller.js';
import { passportCall } from '../middlewares/auth.middleware.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();

router.get('/', productsController.getAll);
router.get('/:pid', productsController.getById);
router.post(
  '/',
  passportCall('jwt'),
  authorization('admin'),
  productsController.create
);

router.put(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  productsController.update
);

router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  productsController.delete
);

export default router;