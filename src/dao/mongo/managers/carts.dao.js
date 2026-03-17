import { CartModel } from "../models/cart.model.js";

export default class CartsDAO {

  async createCart(userId) {

    const cart = await CartModel.create({
      user: userId,
      products: []
    });

    return cart;
  }

  async getCartById(cid) {
    return await CartModel
      .findById(cid)
      .populate("products.product")
      .lean();
  }

  async addProduct(cid, pid) {

    const cart = await CartModel.findById(cid);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    const productIndex = cart.products.findIndex(
      p => p.product.toString() === pid
    );

    if (productIndex !== -1) {

      cart.products[productIndex].quantity++;

    } else {

      cart.products.push({
        product: pid,
        quantity: 1
      });

    }

    await cart.save();

    return cart;
  }

}