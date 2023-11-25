import { UpdateCartDTO } from "../../presentation/dtos/update-cart-dto";

export interface CartControllerInterface {
  addProductToCart(params: UpdateCartDTO): void;
  removeProductFromCart(params: UpdateCartDTO): void;
  updateProductInCartQuantity(params: UpdateCartDTO, newQuantity: number): void;
}
