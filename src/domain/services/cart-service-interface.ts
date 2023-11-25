import { UpdateCartDTO } from "../../presentation/dtos/update-cart-dto";

export interface CartServiceInterface {
  addProductToCart(params: UpdateCartDTO): void;
  removeProductFromCart(params: UpdateCartDTO): void;
  updateProductInCartQuantity(params: UpdateCartDTO, newQuantity: number): void;
}
