import { Product } from "../entities/product";

export interface ProductsRepositoryInterface {
  getProductsSuggestions(): Promise<Product[]>;
}
