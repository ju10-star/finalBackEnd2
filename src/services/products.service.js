import mongoose from 'mongoose';
import { productsRepository } from '../repositories/products.repository.js';

class ProductsService {
  async getAllProducts() {
    return await productsRepository.getAllProducts();
  }

  async getProductById(pid) {
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      throw new Error('ID de producto inválido');
    }

    const product = await productsRepository.getProductById(pid);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  async createProduct(productData) {
    const {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails
    } = productData;

    if (!title || !description || !code || price === undefined || stock === undefined || !category) {
      throw new Error('Faltan campos obligatorios');
    }

    const existingProduct = await productsRepository.getProductByCode(code);

    if (existingProduct) {
      throw new Error('Ya existe un producto con ese code');
    }

    const newProduct = {
      title,
      description,
      code,
      price: Number(price),
      stock: Number(stock),
      category,
      status: productData.status ?? true,
      thumbnails: Array.isArray(thumbnails) ? thumbnails : []
    };

    if (Number.isNaN(newProduct.price) || newProduct.price < 0) {
      throw new Error('El price debe ser un número válido mayor o igual a 0');
    }

    if (Number.isNaN(newProduct.stock) || newProduct.stock < 0) {
      throw new Error('El stock debe ser un número válido mayor o igual a 0');
    }

    return await productsRepository.createProduct(newProduct);
  }

  async updateProduct(pid, updateData) {
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      throw new Error('ID de producto inválido');
    }

    const existingProduct = await productsRepository.getProductById(pid);

    if (!existingProduct) {
      throw new Error('Producto no encontrado');
    }

    if (updateData.price !== undefined) {
      updateData.price = Number(updateData.price);

      if (Number.isNaN(updateData.price) || updateData.price < 0) {
        throw new Error('El price debe ser un número válido mayor o igual a 0');
      }
    }

    if (updateData.stock !== undefined) {
      updateData.stock = Number(updateData.stock);

      if (Number.isNaN(updateData.stock) || updateData.stock < 0) {
        throw new Error('El stock debe ser un número válido mayor o igual a 0');
      }
    }

    if (updateData.code) {
      const productWithSameCode = await productsRepository.getProductByCode(updateData.code);

      if (
        productWithSameCode &&
        productWithSameCode._id.toString() !== pid
      ) {
        throw new Error('Ya existe otro producto con ese code');
      }
    }

    const updatedProduct = await productsRepository.updateProduct(pid, updateData);

    if (!updatedProduct) {
      throw new Error('No se pudo actualizar el producto');
    }

    return updatedProduct;
  }

  async deleteProduct(pid) {
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      throw new Error('ID de producto inválido');
    }

    const existingProduct = await productsRepository.getProductById(pid);

    if (!existingProduct) {
      throw new Error('Producto no encontrado');
    }

    return await productsRepository.deleteProduct(pid);
  }

}

export const productsService = new ProductsService();