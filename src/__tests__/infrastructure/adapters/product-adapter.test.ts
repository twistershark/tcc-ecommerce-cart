import { Product } from "../../../domain/entities/product";
import { ProductsAdapter } from "../../../infrastructure/adapters/products-adapter";
import { MockHttpClient } from "../../__mocks__/infrastructure/clients/mock-http-client";

describe("ProductAdapter", () => {
  const productAdapter = new ProductsAdapter(new MockHttpClient<Product[]>());

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be able to call the get method with params", async () => {
    const spy = jest.spyOn(productAdapter, "getProductsSuggestions");
    const products = await productAdapter.getProductsSuggestions();

    expect(spy).toHaveBeenCalled();
    expect(products).toBeInstanceOf(Array<Product>);
  });
});
