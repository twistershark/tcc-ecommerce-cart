import { ProductInCart } from "../../domain/entities/product";

export interface UpdateCartDTO {
  product: ProductInCart;
  cart: ProductInCart[];
  setCart: (cart: ProductInCart[]) => void;
}
