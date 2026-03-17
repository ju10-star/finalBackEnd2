import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { passportCall } from "../middlewares/auth.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post(
    "/", 
    passportCall("jwt"), 
    authorization("user", "admin"),
    cartsController.createCart
);

router.get(
    "/:cid", 
    passportCall("jwt"), 
    authorization("user", "admin"),
    cartsController.getCart
);

router.post(
    "/:cid/product/:pid", 
    passportCall("jwt"), 
    authorization("user", "admin"),
    cartsController.addProduct
);

export default router;