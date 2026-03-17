import { productsService } from '../services/products.service.js';

class ProductsController {
  async getAll(req, res, next) {
    try {
      const products = await productsService.getAllProducts();

      res.status(200).json({
        status: 'success',
        payload: products
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { pid } = req.params;
      const product = await productsService.getProductById(pid);

      res.status(200).json({
        status: 'success',
        payload: product
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const product = await productsService.createProduct(req.body);

      res.status(201).json({
        status: 'success',
        payload: product
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { pid } = req.params;
      const updatedProduct = await productsService.updateProduct(pid, req.body);

      res.status(200).json({
        status: 'success',
        payload: updatedProduct
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { pid } = req.params;
      const deletedProduct = await productsService.deleteProduct(pid);

      res.status(200).json({
        status: 'success',
        payload: deletedProduct
      });
    } catch (error) {
      next(error);
    }
  }
}

export const productsController = new ProductsController();