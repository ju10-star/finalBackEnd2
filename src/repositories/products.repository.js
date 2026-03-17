import { productsDAO } from '../dao/mongo/managers/products.dao.js';

class ProductsRepository {
  async getAllProducts() {
    return await productsDAO.getAll();
  }

  async getProductById(pid) {
    return await productsDAO.getById(pid);
  }

  async getProductByCode(code) {
    return await productsDAO.getByCode(code);
  }

  async createProduct(productData) {
    return await productsDAO.create(productData);
  }

  async updateProduct(pid, updateData) {
    return await productsDAO.update(pid, updateData);
  }

  async deleteProduct(pid) {
    return await productsDAO.delete(pid);
  }

}

export const productsRepository = new ProductsRepository();