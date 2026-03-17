import { cartsRepository } from "../repositories/carts.repository.js";

class CartsService {

  async createCart(userId) {

    if (!userId) {
      throw new Error("Usuario no autenticado");
    }

    return await cartsRepository.createCart(userId);
  }

  async getCart(cid, userId) {

    if (!cid) {
      throw new Error("ID de carrito inválido");
    }

    const cart = await cartsRepository.getCartById(cid);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    if (cart.user.toString() !== userId.toString()) {
      throw new Error("No puedes ver el carrito de otro usuario");
    }

    return cart;
  }

  async addProduct(cid, pid, userId) {

    if (!cid || !pid) {
      throw new Error("Datos incompletos");
    }

    const cart = await cartsRepository.getCartById(cid);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    if (cart.user.toString() !== userId.toString()) {
      throw new Error("No puedes modificar el carrito de otro usuario");
    }

    return await cartsRepository.addProduct(cid, pid);
  }

}

export const cartsService = new CartsService();