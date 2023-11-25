import { PRODUCTS } from "../../constants/products";
import { HttpClientInterface } from "./http-client-interface";

export class HttpClient<T> implements HttpClientInterface<T> {
  async get(_pathname: string): Promise<any> {
    return Promise.resolve(PRODUCTS);
  }
}
