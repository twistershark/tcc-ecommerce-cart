import { CartService } from "../../application/services/cart-service";
import { CartControllerInterface } from "../../domain/controllers/cart-controller-interface";
import { CartServiceInterface } from "../../domain/services/cart-service-interface";
import { UpdateCartDTO } from "../dtos/update-cart-dto";

export class CartController implements CartControllerInterface {
  private cartService: CartServiceInterface;

  constructor(productsService?: CartServiceInterface) {
    this.cartService = productsService ?? new CartService();
  }
  addProductToCart(params: UpdateCartDTO): void {
    this.cartService.addProductToCart(params);
  }
  removeProductFromCart(params: UpdateCartDTO): void {
    this.cartService.removeProductFromCart(params);
  }
  updateProductInCartQuantity(
    params: UpdateCartDTO,
    newQuantity: number
  ): void {
    this.cartService.updateProductInCartQuantity(params, newQuantity);
  }
}

export default new CartController();
