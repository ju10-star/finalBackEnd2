import { Router } from 'express';
import productsRouter from './products.router.js';
import sessionsRouter from './sessions.router.js';
import purchaseRouter from "./purchase.router.js";
import cartsRouter from "./carts.router.js";

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Servidor operativo'
  });
});

router.use('/products', productsRouter);
router.use('/sessions', sessionsRouter);
router.use('/carts', cartsRouter);
router.use('/purchase', purchaseRouter);

export default router;