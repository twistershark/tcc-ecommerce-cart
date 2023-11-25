import { Product } from "../../../../domain/entities/product";
import { ProductsServiceInterface } from "../../../../domain/services/products-service-interface";
import { MockProductRepository } from "../../infrastructure/repositories/mock-products-repository";

export class MockProductsService implements ProductsServiceInterface {
  productRepository = new MockProductRepository();

  async getProductsSuggestions(): Promise<Product[]> {
    const products = await this.productRepository.getProductsSuggestions();
    return products.slice(0, 4);
  }
}
