import { Product } from "../entities/product";

export interface ProductsControllerInterface {
  getProductsSuggestions(): Promise<Product[]>;
}
