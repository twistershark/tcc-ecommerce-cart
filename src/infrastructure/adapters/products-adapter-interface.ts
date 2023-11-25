import { Product } from "../../domain/entities/product";

export interface ProductsAdapterInterface {
  getProductsSuggestions(): Promise<Product[]>;
}
