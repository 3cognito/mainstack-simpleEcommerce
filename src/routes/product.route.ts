import express, { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter = express.Router();
const productController = new ProductController();

productRouter
  .route("/product")
  .post(productController.createProduct)
  .get(productController.getAllProducts);
productRouter
  .route("/product/:id")
  .put(productController.updateProduct)
  .get(productController.getProduct)
  .delete(productController.deleteProduct);

export default productRouter;
