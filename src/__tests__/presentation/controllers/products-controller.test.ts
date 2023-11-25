import { ProductsController } from "../../../presentation/controllers/products-controller";
import { MockProductsService } from "../../__mocks__/domain/services/mock-products-service";

describe("ProductsController", () => {
  const productsController = new ProductsController(new MockProductsService());

  it("should be able to load suggestions", async () => {
    const products = await productsController.getProductsSuggestions();

    expect(products).toBeDefined();
    expect(products).toHaveLength(4);
  });
});
