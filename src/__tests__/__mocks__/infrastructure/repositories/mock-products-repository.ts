import { Product } from "../../../../domain/entities/product";
import { ProductsRepositoryInterface } from "../../../../domain/repositories/products-repository-interface";
import { createRandomProducts } from "../../domain/entities/mock-product";

export class MockProductRepository implements ProductsRepositoryInterface {
  async getProductsSuggestions(): Promise<Product[]> {
    const products = createRandomProducts(20);

    return Promise.resolve(products);
  }
}
