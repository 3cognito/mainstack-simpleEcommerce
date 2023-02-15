import { Request, Response } from "express";
import { IProduct } from "../models/product.model";
import { ProductServices } from "../services/product.service";

export class ProductController {
  private productService: ProductServices;

  constructor() {
    this.productService = new ProductServices();
  }

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await this.productService.getProducts(3, 4); //Temporary placeholder
    res.send(products);
  };

  getProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await this.productService.getProduct(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  };

  createProduct = async (req: Request, res: Response): Promise<void> => {
    const productData: IProduct = req.body;
    const newProduct = await this.productService.createProduct(productData);
    res.send(newProduct);
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
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
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedProduct = await this.productService.deleteProduct(id);
    if (deletedProduct) {
      res.send({ message: "Product deleted" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  };
}
