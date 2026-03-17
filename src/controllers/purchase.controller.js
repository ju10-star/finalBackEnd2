import { purchaseService } from "../services/purchase.service.js";

class PurchaseController {

  async purchase(req, res, next) {

    try {

      const { cid } = req.params;
      const user = req.user;

      const result = await purchaseService.purchaseCart(cid, user);

      res.status(200).json({
        status: "success",
        payload: result
      });

    } catch (error) {
      next(error);
    }

  }

}

export const purchaseController = new PurchaseController();