import { Request, Response, NextFunction } from "express";
import { IProduct } from "../models/product.model";
import { ProductServices } from "../services/product.service";

export class ProductController {
  private productService: ProductServices;

  constructor() {
    this.productService = new ProductServices();
  }

  getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const pageNumber = +page ?? 1;
      const limitNumber = +limit ?? 10;
      const products = await this.productService.getProducts(
        pageNumber,
        limitNumber
      );
      res.send(products);
    } catch (err) {
      next(err);
    }
  };

  getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProduct(id);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (err) {
      next(err);
    }
  };

  createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData: IProduct = req.body;
      const newProduct = await this.productService.createProduct(productData);
      res.send(newProduct);
    } catch (err) {
      next(err);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const productData: IProduct = req.body;
      const updatedProduct = await this.productService.updateProduct(
        id,
        productData
      );
      if (updatedProduct) {
        res.send(updatedProduct);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (err) {
      next(err);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedProduct = await this.productService.deleteProduct(id);
      if (deletedProduct) {
        res.send({ message: "Product deleted" });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (err) {
      next(err);
    }
  };
}
