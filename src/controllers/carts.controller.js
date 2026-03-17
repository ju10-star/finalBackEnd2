import { cartsService } from "../services/carts.service.js";

class CartsController {

  async createCart(req, res, next) {

    try {

      const userId = req.user.id;

      const cart = await cartsService.createCart(userId);

      res.status(201).json({
        status: "success",
        payload: cart
      });

    } catch (error) {
      next(error);
    }

  }

  async getCart(req, res, next) {

    try {

      const { cid } = req.params;
      const userId = req.user.id;

      const cart = await cartsService.getCart(cid, userId);

      res.status(200).json({
        status: "success",
        payload: cart
      });

    } catch (error) {
      next(error);
    }

  }

  async addProduct(req, res, next) {

    try {

      const { cid, pid } = req.params;
        const userId = req.user.id;

      const cart = await cartsService.addProduct(cid, pid, userId);

      res.status(200).json({
        status: "success",
        payload: cart
      });

    } catch (error) {
      next(error);
    }

  }

}

export const cartsController = new CartsController();