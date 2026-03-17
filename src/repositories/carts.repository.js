import CartsDAO from "../dao/mongo/managers/carts.dao.js";

const cartsDAO = new CartsDAO();

class CartsRepository {

  createCart(userId) {
    return cartsDAO.createCart(userId);
  }

  getCartById(cid) {
    return cartsDAO.getCartById(cid);
  }

  addProduct(cid, pid) {
    return cartsDAO.addProduct(cid, pid);
  }

}

export const cartsRepository = new CartsRepository();