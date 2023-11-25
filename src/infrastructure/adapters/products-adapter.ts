import { Product } from "../../domain/entities/product";
import { HttpClientInterface } from "../clients/http-client-interface";
import { ProductsAdapterInterface } from "./products-adapter-interface";

export class ProductsAdapter implements ProductsAdapterInterface {
  private httpClient: HttpClientInterface<Product>;

  constructor(httpClient: HttpClientInterface<Product>) {
    this.httpClient = httpClient;
  }

  async getProductsSuggestions(): Promise<Product[]> {
    const products = await this.httpClient.get("/products-suggestions");
    return products as Product[];
  }
}
