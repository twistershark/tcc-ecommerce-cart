import { PRODUCTS } from "../../../constants/products";
import { HttpClient } from "../../../infrastructure/clients/http-client";

describe("HttpClient", () => {
  it("should be able to call the get method and receive the correct products response", async () => {
    const httpClient = new HttpClient();

    const url = "/products-suggestions";

    const response = await httpClient.get(url);

    expect(response).toStrictEqual(PRODUCTS);
  });
});
