import { Product } from "../entities/product";

export interface ProductsServiceInterface {
  getProductsSuggestions(): Promise<Product[]>;
}
