import { Product } from "../../../../domain/entities/product";
import { ProductsAdapterInterface } from "../../../../infrastructure/adapters/products-adapter-interface";
import { MockHttpClient } from "../clients/mock-http-client";

export class MockProductAdapter implements ProductsAdapterInterface {
  private httpClient = new MockHttpClient<Product[]>();

  async getProductsSuggestions(): Promise<Product[]> {
    const data = await this.httpClient.get(`/products-suggestions`);
    return data;
  }
}
