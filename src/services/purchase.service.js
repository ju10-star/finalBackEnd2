import { cartsRepository } from "../repositories/carts.repository.js";
import { productsRepository } from "../repositories/products.repository.js";
import { ticketsRepository } from "../repositories/tickets.repository.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { UUID } from "bson";
import { generateCode } from "../utils/generateCode.js";

class PurchaseService {

  async purchaseCart(cid, user) {

    const cart = await cartsRepository.getCartById(cid);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    if (cart.user.toString() !== user.id.toString()) {
      throw new Error("No puedes comprar el carrito de otro usuario");
    }

    const productsWithStock = [];
    const productsWithoutStock = [];

    for (const item of cart.products) {

      const product = await productsRepository.getProductById(item.product._id);

      if (product.stock >= item.quantity) {

        product.stock -= item.quantity;
        await productsRepository.updateProduct(product._id, product);

        productsWithStock.push(item);

      } else {

        productsWithoutStock.push(item);

      }

    }

    let totalAmount = 0;

    for (const item of productsWithStock) {

      totalAmount += item.product.price * item.quantity;

    }

    const ticket = await ticketsRepository.createTicket({

      /*code: uuidv4(), */
      /*code: crypto.randomUUID(),*/
      code: generateCode(),
      amount: totalAmount,
      purchaser: user.email

    });

    const remainingProducts = productsWithoutStock;

    await cartsRepository.updateCartProducts(cid, remainingProducts);

    return {
      ticket,
      productsWithoutStock
    };

  }

}

export const purchaseService = new PurchaseService();