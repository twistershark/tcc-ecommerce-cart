import React from "react";
import { Product } from "../../../domain/entities/product";

interface ProductSuggestionProps {
  product: Product;
  addProductToCart: (product: Product) => void;
  isInCart: boolean;
}

export function ProductSuggestion({
  product,
  addProductToCart,
  isInCart,
}: Readonly<ProductSuggestionProps>) {
  return (
    <div className="ca-group ca-relative ca-shadow-lg">
      <div className="ca-aspect-h-1 ca-aspect-w-1 ca-w-full overflow-hidden ca-rounded-md ca-bg-gray-200 ca-lg:aspect-none group-hover:ca-opacity-75 lg:ca-h-80">
        <img
          src={product.image}
          alt={product.name}
          className="ca-h-full ca-w-full ca-object-cover ca-object-center lg:ca-h-full lg:ca-w-full"
        />
      </div>

      <div className="ca-mt-4 ca-flex ca-flex-col ca-items-center ca-p-4 ca-gap-4">
        <div className="ca-flex ca-flex-col ca-items-center">
          <h3 className="ca-text-sm ca-text-gray-700 ca-font-sans ca-font-semibold">
            {product.name}
          </h3>
          <p className="ca-text-sm ca-text-gray-500">{product.color}</p>
        </div>

        <p className="ca-text-lg ca-font-medium ca-text-gray-900 ca-font-serif">
          R$ {product.price}
        </p>

        {!isInCart ? (
          <button
            onClick={() => addProductToCart(product)}
            className="ca-border ca-border-black ca-py-[1rem] ca-px-[46px] ca-justify-center ca-items-center"
          >
            Adicionar ao carrinho
          </button>
        ) : null}
      </div>
    </div>
  );
}
