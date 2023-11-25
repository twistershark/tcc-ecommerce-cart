import { Product } from "../../../domain/entities/product";
import { ProductsRepository } from "../../../infrastructure/repositories/products-repository";
import { MockProductAdapter } from "../../__mocks__/infrastructure/adapters/mock-product-adapter";

describe("ProductsRepository", () => {
  const productsRepository = new ProductsRepository(new MockProductAdapter());

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be able to call the loadProducts method", async () => {
    const spy = jest.spyOn(productsRepository, "getProductsSuggestions");
    const products = await productsRepository.getProductsSuggestions();

    expect(spy).toHaveBeenCalled();
    expect(products).toBeInstanceOf(Array<Product>);
  });
});
