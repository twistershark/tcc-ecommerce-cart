import React, { useEffect, useState } from "react";
import useCart from "../../store/cart";
import { formatCurrency } from "../../../utils/formatCurrency";
import cartController from "../../controllers/cart-controller";
import { Product, ProductInCart } from "../../../domain/entities/product";
import { TrashIcon } from "../../assets/svgs/trash-icon";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "../../assets/svgs/chevron-left-icon";
import { ProductSuggestion } from "../../components/product-suggestion";
import productsController from "../../controllers/products-controller";

const TAX = 5.99;

export function Cart() {
  const [cart, setCart] = useCart();
  const [productsSuggestions, setProductsSuggestions] = useState<Product[]>([]);

  const totalPrice = cart.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);

  function handleAddProductQuantity(product: ProductInCart) {
    try {
      const params = {
        product,
        cart,
        setCart,
      };
      cartController.updateProductInCartQuantity(params, product.quantity + 1);
    } catch (err) {
      console.error(err);
    }
  }

  function handleSubtractProductQuantity(product: ProductInCart) {
    try {
      const params = {
        product,
        cart,
        setCart,
      };
      cartController.updateProductInCartQuantity(params, product.quantity - 1);
    } catch (err) {
      console.error(err);
    }
  }

  function handleAddProductToCart(product: Product) {
    try {
      const params = {
        product: { ...product, quantity: 1 },
        cart,
        setCart,
      };
      cartController.addProductToCart(params);
    } catch (err) {
      console.error(err);
    }
  }

  function handleRemoveProductFromCart(product: ProductInCart) {
    try {
      const params = {
        product,
        cart,
        setCart,
      };
      cartController.removeProductFromCart(params);
    } catch (err) {
      console.error(err);
    }
  }

  function handleClearCart() {
    setCart([]);
  }

  async function handleLoadSuggestions() {
    const suggestions = await productsController.getProductsSuggestions();
    setProductsSuggestions(suggestions);
  }

  useEffect(() => {
    handleLoadSuggestions();
  }, []);

  return (
    <div className="ca-w-full ca-mx-auto ca-max-w-2xl sm:ca-px-6 sm:ca-py-24 lg:ca-max-w-7xl lg:ca-px-8 lg:ca-py-8 ca-flex ca-flex-col ca-gap-8">
      <h1 className="ca-text-[#555] ca-text-2xl ca-font-normal ca-font-serif ca-my-4">
        Seu carrinho
      </h1>
      <div className="ca-flex ca-gap-4">
        <div className="ca-w-full">
          <div className="ca-grid ca-grid-cols-[100px_2fr_1fr_1fr_100px] ca-items-center ca-border-b-[1px] ca-bg-[#D9D9D9] ca-py-4">
            <div />
            <strong className="ca-font-serif">Produto</strong>
            <strong className="ca-font-serif">Quantidade</strong>
            <strong className="ca-font-serif">Total</strong>
            <div />
          </div>
          {cart.length ? (
            cart.map((product) => (
              <div
                key={product.id}
                className="ca-grid ca-grid-cols-[100px_2fr_1fr_1fr_100px] ca-items-center ca-border-b-[1px] ca-py-2 ca-font-sans"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="ca-w-[100px] ca-h-[100px] ca-object-contain"
                />

                <div className="ca-flex ca-flex-col">
                  <strong>{product.name}</strong>
                  <span>Cor: {product.color}</span>
                  <strong className="ca-font-serif ca-mt-2">
                    {formatCurrency(product.price)}
                  </strong>
                </div>

                <div className="ca-flex">
                  <button
                    onClick={() => handleSubtractProductQuantity(product)}
                    className="ca-flex ca-items-center ca-justify-center ca-px-[1rem] ca-py-[.5rem] ca-border ca-border-black"
                    data-testid="decrement-button"
                  >
                    -
                  </button>
                  <span className="ca-w-[3rem] ca-flex ca-items-center ca-justify-center ca-bg-[#EDEDED]">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => handleAddProductQuantity(product)}
                    className="ca-flex ca-items-center ca-justify-center ca-px-[1rem] ca-py-[.5rem] ca-border ca-border-black"
                    data-testid="increment-button"
                  >
                    +
                  </button>
                </div>

                <strong className="ca-font-serif ca-text-lg">
                  {formatCurrency(product.price * product.quantity)}
                </strong>

                <button
                  onClick={() => handleRemoveProductFromCart(product)}
                  className="ca-flex ca-items-center ca-justify-center"
                >
                  <TrashIcon />
                </button>
              </div>
            ))
          ) : (
            <div className="ca-w-full ca-text-center ca-font-bold ca-py-8">
              Nenhum produto adicionado ao carrinho!
            </div>
          )}

          <div className="ca-flex ca-items-center ca-justify-between ca-mt-4">
            <Link
              to="/produtos"
              className="ca-flex ca-items-center ca-gap-2 ca-font-sans"
            >
              <ChevronLeftIcon /> Continuar comprando
            </Link>
            {cart.length ? (
              <button onClick={handleClearCart} className="ca-font-sans">
                Limpar carrinho
              </button>
            ) : null}
          </div>
        </div>

        <div className="ca-border ca-border-[#8D8D8D] ca-flex ca-flex-col ca-w-[280px] ca-bg-[#D9D9D9]">
          <strong className="ca-font-serif ca-pb-4 ca-py-4 ca-px-6">
            Resumo
          </strong>
          <hr />
          <div className="ca-bg-white ca-flex ca-flex-col ca-h-full ca-py-4 ca-px-6 ca-justify-between ca-min-h-[350px]">
            <div className="ca-flex ca-flex-col">
              <span>
                <strong className="ca-text-md">Produtos: </strong>
                {cart.length}
              </span>
              <span>
                <strong className="ca-text-md">Taxa: </strong>
                {formatCurrency(TAX)}
              </span>
              <span>
                <strong className="ca-text-md">Total produtos: </strong>
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <div>
              <strong>
                Total com taxa: {formatCurrency(totalPrice + TAX)}
              </strong>
              <button className="ca-text-white ca-bg-black ca-px-4 ca-py-2 ca-w-full">
                Ir para pagamento
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="ca-text-[#555] ca-text-xl ca-font-normal ca-font-serif ca-mt-16">
          Talvez você goste
        </h3>
        <div className="ca-mt-6 ca-grid ca-grid-cols-1 ca-gap-x-6 ca-gap-y-10 sm:ca-grid-cols-2 lg:ca-grid-cols-4 xl:ca-gap-x-8">
          {productsSuggestions.map((product) => (
            <ProductSuggestion
              key={product.id}
              product={product}
              addProductToCart={handleAddProductToCart}
              isInCart={!!cart.find((p) => p.productId === product.productId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
