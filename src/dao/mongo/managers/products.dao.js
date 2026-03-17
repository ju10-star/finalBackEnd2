import { ProductModel } from '../models/product.model.js';

class ProductsDAO {
  async getAll() {
    return await ProductModel.find().lean();
  }

  async getById(pid) {
    return await ProductModel.findById(pid).lean();
  }

  async getByCode(code) {
    return await ProductModel.findOne({ code }).lean();
  }

  async create(productData) {
    return await ProductModel.create(productData);
  }

  async update(pid, updateData) {
    return await ProductModel.findByIdAndUpdate(pid, updateData, {
      new: true
    }).lean();
  }

  async delete(pid) {
    return await ProductModel.findByIdAndDelete(pid).lean();
  }

}

export const productsDAO = new ProductsDAO();