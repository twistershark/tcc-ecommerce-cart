import { Product } from "../../../domain/entities/product";
import { ProductsService } from "../../../application/services/products-service";
import { MockProductRepository } from "../../__mocks__/infrastructure/repositories/mock-products-repository";

describe("ProductsService", () => {
  const productsService = new ProductsService(new MockProductRepository());

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be able to load products suggestion", async () => {
    const products = await productsService.getProductsSuggestions();

    expect(products).toBeInstanceOf(Array<Product>);
    expect(products).toHaveLength(4);
  });
});
