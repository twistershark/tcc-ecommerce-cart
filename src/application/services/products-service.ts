import { Product } from "../../domain/entities/product";
import { ProductsRepositoryInterface } from "../../domain/repositories/products-repository-interface";
import { ProductsServiceInterface } from "../../domain/services/products-service-interface";

export class ProductsService implements ProductsServiceInterface {
  private repository: ProductsRepositoryInterface;

  constructor(productRepository: ProductsRepositoryInterface) {
    this.repository = productRepository;
  }

  async getProductsSuggestions(): Promise<Product[]> {
    const products = await this.repository.getProductsSuggestions();

    const tempProducts = [...products];
    const randomProducts = [];

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * tempProducts.length);

      randomProducts.push(tempProducts[randomIndex]);

      tempProducts.splice(randomIndex, 1);
    }

    return randomProducts;
  }
}
