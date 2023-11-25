import { ProductInCart } from "../../../domain/entities/product";
import { CartService } from "../../../application/services/cart-service";
import { createRandomProduct } from "../../__mocks__/domain/entities/mock-product";

describe("CartService", () => {
  const cartService = new CartService();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be able to add product to cart", async () => {
    const product = createRandomProduct();
    let cart: ProductInCart[] = [];
    const setCart = (newCart: ProductInCart[]) => {
      cart = newCart;
    };

    const params = { product, cart, setCart };

    cartService.addProductToCart(params);

    expect(cart).toHaveLength(1);
    expect(cart).toEqual([product]);
  });

  it("should not be able to add product that is already in cart", async () => {
    const product = createRandomProduct();
    const cart: ProductInCart[] = [product];
    const setCart = jest.fn();

    const params = { product, cart, setCart };

    expect(() => {
      cartService.addProductToCart(params);
    }).toThrow(
      "Product is already in the cart! Remove the product before trying to add it"
    );
  });

  it("should be able to increase product quantity", async () => {
    const product = createRandomProduct();
    let cart: ProductInCart[] = [product];
    const setCart = (newCart: ProductInCart[]) => {
      cart = newCart;
    };

    const params = { product, cart, setCart };
    const newQuantity = 3;

    cartService.updateProductInCartQuantity(params, newQuantity);

    expect(cart[0].quantity).toEqual(newQuantity);
  });

  it("should not be able to change the quantity of a product that is not in cart", async () => {
    const product = createRandomProduct();
    let cart: ProductInCart[] = [];
    const setCart = (newCart: ProductInCart[]) => {
      cart = newCart;
    };

    const params = { product, cart, setCart };
    const newQuantity = 3;

    expect(() => {
      cartService.updateProductInCartQuantity(params, newQuantity);
    }).toThrow("Product is not in cart!");
  });

  it("should be able to decrease product quantity", async () => {
    const product = createRandomProduct();
    let cart: ProductInCart[] = [{ ...product, quantity: 5 }];
    const setCart = (newCart: ProductInCart[]) => {
      cart = newCart;
    };

    const params = { product, cart, setCart };
    const newQuantity = 4;

    cartService.updateProductInCartQuantity(params, newQuantity);

    expect(cart[0].quantity).toEqual(newQuantity);
  });

  it("should remove the product from cart if the new quantity is equal to zero", async () => {
    const product = createRandomProduct();
    let cart: ProductInCart[] = [product];
    const setCart = (newCart: ProductInCart[]) => {
      cart = newCart;
    };

    const params = { product, cart, setCart };
    const newQuantity = 0;

    cartService.updateProductInCartQuantity(params, newQuantity);

    expect(cart).toHaveLength(0);
    expect(cart).toEqual([]);
  });

  it("should be able to remove product from cart", async () => {
    const product = createRandomProduct();
    let cart: ProductInCart[] = [product];
    const setCart = (newCart: ProductInCart[]) => {
      cart = newCart;
    };

    const params = { product, cart, setCart };

    cartService.removeProductFromCart(params);

    expect(cart).toHaveLength(0);
    expect(cart).toEqual([]);
  });

  it("should not be able to remove a product that is not in cart", async () => {
    const product = createRandomProduct();
    let cart: ProductInCart[] = [];
    const setCart = (newCart: ProductInCart[]) => {
      cart = newCart;
    };

    const params = { product, cart, setCart };

    expect(() => {
      cartService.removeProductFromCart(params);
    }).toThrow("Product is not in cart!");
  });
});
