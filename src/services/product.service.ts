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

export class ProductServices implements ProductService {
  async createProduct(product: ProductInterface): Promise<ProductInterface> {
    const newProduct = new Product(product);
    return newProduct.save();
  }

  async getProducts(page: number, limit: number): Promise<ProductInterface[]> {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return products;
  }

  async getProduct(id: string): Promise<ProductInterface | null> {
    const product = await Product.findById(id);
    return product || null;
  }

  async updateProduct(id: string, product: ProductInterface): Promise<ProductInterface | null> {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return updatedProduct || null;
  }

  async deleteProduct(id: string): Promise<ProductInterface | null> {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct || null;
  }
}
