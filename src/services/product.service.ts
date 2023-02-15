import Product, { IProduct as ProductInterface } from "../models/product.model";

//Product Interface
export interface ProductService {
  createProduct(product: ProductInterface): Promise<ProductInterface>;
  getProducts(page: number, limit: number): Promise<ProductInterface[]>;
  getProduct(id: string): Promise<ProductInterface | null>;
  updateProduct(
    id: string,
    product: ProductInterface
  ): Promise<ProductInterface | null>;
  deleteProduct(id: string): Promise<ProductInterface | null>;
}
