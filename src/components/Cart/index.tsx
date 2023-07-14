import React from "react";
import { Link } from "react-router-dom";

import useCart, { ProductInCart } from "../../store/cart";

import "tailwindcss/tailwind.css";

const TAX = 5.99;

export default function Cart() {
  const [cart, setCart] = useCart();

  const isCartEmpty = !!cart && cart.length === 0;

  const subtotal = cart.reduce((acc, product) => {
    return (acc += product.price * product.quantity);
  }, 0);
  const total = subtotal + TAX;

  const priceFormatter = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

  const addProductQuantity = (product: ProductInCart) => {
    const updatedCart = [...cart];

    setCart(
      updatedCart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const subtractProductQuantity = (product: ProductInCart) => {
    const updatedCart = [...cart];

    setCart(
      updatedCart.map((p) =>
        p.id === product.id
          ? { ...p, quantity: p.quantity > 2 ? p.quantity - 1 : 1 }
          : p
      )
    );
  };

  const removeProductFromCart = (product: ProductInCart) => {
    if (cart.length === 1) return setCart([]);

    const updatedCart = [...cart];

    setCart(updatedCart.filter((p) => p.id !== product.id));
  };

  return (
    <>
      <h1 className="ca-mb-10 ca-text-center ca-text-2xl ca-font-bold">
        Carrinho
      </h1>
      <div className="ca-mx-auto ca-max-w-5xl ca-justify-center ca-px-6 md:ca-flex md:ca-space-x-6 xl:ca-px-0">
        <div className="ca-rounded-lg md:ca-w-2/3">
          {cart.map((product: ProductInCart) => (
            <div className="ca-justify-between ca-mb-6 ca-rounded-lg ca-bg-white ca-p-6 ca-shadow-md sm:ca-flex sm:ca-justify-start">
              <img
                src={product.image}
                alt={product.name}
                className="ca-w-full ca-rounded-lg sm:ca-w-40"
              />
              <div className="sm:ca-ml-4 sm:ca-flex sm:ca-w-full sm:ca-justify-between">
                <div className="ca-mt-5 sm:ca-mt-0">
                  <h2 className="ca-text-lg ca-font-bold ca-text-gray-900">
                    {product.name}
                  </h2>
                  <p className="ca-mt-1 ca-text-xs ca-text-gray-700">
                    {product.color}
                  </p>
                </div>
                <div className="ca-mt-4 ca-flex ca-justify-between sm:ca-space-y-6 sm:ca-mt-0 sm:ca-block sm:ca-space-x-6">
                  <div className="ca-flex ca-items-center ca-border-gray-100">
                    <button
                      onClick={() => subtractProductQuantity(product)}
                      className="ca-cursor-pointer ca-rounded-l ca-bg-gray-100 ca-py-1 ca-px-3.5 ca-duration-100 hover:ca-bg-indigo-600 hover:ca-text-blue-50"
                    >
                      -
                    </button>
                    <input
                      className="ca-h-8 ca-w-8 ca-border ca-bg-white ca-text-center ca-text-xs ca-outline-none"
                      value={product.quantity}
                    />
                    <button
                      onClick={() => addProductQuantity(product)}
                      className="ca-cursor-pointer ca-rounded-r ca-bg-gray-100 ca-py-1 ca-px-3 ca-duration-100 hover:ca-bg-indigo-600 hover:ca-text-blue-50"
                    >
                      +
                    </button>
                  </div>
                  <div className="ca-flex ca-items-center ca-space-x-4">
                    <p className="ca-text-sm">
                      {priceFormatter(product.price * product.quantity)}
                    </p>
                    <button onClick={() => removeProductFromCart(product)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="ca-h-5 ca-w-5 ca-cursor-pointer ca-duration-150 hover:ca-text-red-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ca-mt-6 ca-h-full ca-rounded-lg ca-border ca-bg-white ca-p-6 ca-shadow-md md:ca-mt-0 md:ca-w-1/3">
          <div className="ca-mb-2 ca-flex ca-justify-between">
            <p className="ca-text-gray-700">Subtotal</p>
            <p className="ca-text-gray-700">{priceFormatter(subtotal)}</p>
          </div>
          <div className="ca-flex ca-justify-between">
            <p className="ca-text-gray-700">Taxas</p>
            <p className="ca-text-gray-700">{priceFormatter(TAX)}</p>
          </div>
          <hr className="ca-my-4" />
          <div className="ca-flex ca-justify-between">
            <p className="ca-text-lg ca-font-bold">Total</p>
            <div className="">
              <p className="ca-mb-1 ca-text-lg ca-font-bold">
                {priceFormatter(total)}
              </p>
            </div>
          </div>

          {isCartEmpty ? (
            <Link
              to="/"
              className="ca-mt-6 ca-flex ca-w-full ca-items-center ca-justify-center ca-rounded-md ca-border ca-border-transparent ca-bg-indigo-600 ca-px-8 ca-py-3 ca-text-base ca-font-medium ca-text-white hover:ca-bg-indigo-700 focus:ca-outline-none focus:ca-ring-2 focus:ca-ring-indigo-500 focus:ca-ring-offset-2"
            >
              Voltar para o catálogo
            </Link>
          ) : (
            <button className="ca-mt-6 ca-flex ca-w-full ca-items-center ca-justify-center ca-rounded-md ca-border ca-border-transparent ca-bg-indigo-600 ca-px-8 ca-py-3 ca-text-base ca-font-medium ca-text-white hover:ca-bg-indigo-700 focus:ca-outline-none focus:ca-ring-2 focus:ca-ring-indigo-500 focus:ca-ring-offset-2">
              Ir para o pagamento
            </button>
          )}
        </div>
      </div>
    </>
  );
}
