import { ProductsRepositoryInterface } from "../../domain/repositories/products-repository-interface";
import { ProductsAdapterInterface } from "../adapters/products-adapter-interface";

export class ProductsRepository implements ProductsRepositoryInterface {
  private productAdapter: ProductsAdapterInterface;

  constructor(productAdapter: ProductsAdapterInterface) {
    this.productAdapter = productAdapter;
  }

  async getProductsSuggestions() {
    const products = await this.productAdapter.getProductsSuggestions();
    return products;
  }
}
