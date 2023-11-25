import { ProductsService } from "../../application/services/products-service";
import { ProductsControllerInterface } from "../../domain/controllers/products-controller.interface";
import { Product } from "../../domain/entities/product";
import { ProductsServiceInterface } from "../../domain/services/products-service-interface";
import { ProductsAdapter } from "../../infrastructure/adapters/products-adapter";
import { HttpClient } from "../../infrastructure/clients/http-client";
import { ProductsRepository } from "../../infrastructure/repositories/products-repository";

export class CartController implements ProductsControllerInterface {
  private productsService: ProductsServiceInterface;

  constructor(productsService?: ProductsServiceInterface) {
    this.productsService =
      productsService ??
      new ProductsService(
        new ProductsRepository(new ProductsAdapter(new HttpClient()))
      );
  }

  async getProductsSuggestions(): Promise<Product[]> {
    const products = await this.productsService.getProductsSuggestions();
    return products;
  }
}

export default new CartController();
