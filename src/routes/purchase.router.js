import { Router } from "express";
import { purchaseController } from "../controllers/purchase.controller.js";
import { passportCall } from "../middlewares/auth.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post(
    "/:cid/purchase", 
    passportCall("jwt"),
    authorization("user"),
    purchaseController.purchase
);

export default router;