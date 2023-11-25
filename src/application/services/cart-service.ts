import { CartServiceInterface } from "../../domain/services/cart-service-interface";
import { UpdateCartDTO } from "../../presentation/dtos/update-cart-dto";

export class CartService implements CartServiceInterface {
  addProductToCart(params: UpdateCartDTO) {
    const { product, cart, setCart } = params;

    const isProductInCart = cart.find((p) => p.productId === product.productId);

    if (isProductInCart)
      throw new Error(
        "Product is already in the cart! Remove the product before trying to add it"
      );

    setCart([...cart, product]);
  }

  removeProductFromCart(params: UpdateCartDTO) {
    const { product, cart, setCart } = params;

    const isProductInCart = cart.find((p) => p.productId === product.productId);

    if (!isProductInCart) throw new Error("Product is not in cart!");

    const updatedCart = [...cart];

    setCart(updatedCart.filter((p) => p.productId !== product.productId));
  }

  updateProductInCartQuantity(params: UpdateCartDTO, newQuantity: number) {
    const { product, cart, setCart } = params;

    const isProductInCart = cart.find((p) => p.productId === product.productId);

    if (!isProductInCart) throw new Error("Product is not in cart!");

    const updatedCart = [...cart];

    if (newQuantity < 1) {
      return setCart(
        updatedCart.filter((p) => p.productId !== product.productId)
      );
    }

    setCart(
      updatedCart.map((p) =>
        p.productId === product.productId ? { ...p, quantity: newQuantity } : p
      )
    );
  }
}
