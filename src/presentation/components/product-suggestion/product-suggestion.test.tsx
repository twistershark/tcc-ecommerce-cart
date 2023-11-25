import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { ProductSuggestion } from ".";
import { createRandomProduct } from "../../../__tests__/__mocks__/domain/entities/mock-product";

describe("ProductSuggestion", () => {
  it("should render the component correctly", () => {
    const productMock = createRandomProduct();
    const addProductToCartMock = jest.fn();
    const isInCartMock = false;

    render(
      <ProductSuggestion
        product={productMock}
        addProductToCart={addProductToCartMock}
        isInCart={isInCartMock}
      />
    );

    expect(screen.getByText(productMock.name)).toBeInTheDocument();
  });

  it("should be able to add a product to cart", async () => {
    const productMock = createRandomProduct();
    const addProductToCartMock = jest.fn();
    const isInCartMock = false;

    render(
      <ProductSuggestion
        product={productMock}
        addProductToCart={addProductToCartMock}
        isInCart={isInCartMock}
      />
    );

    await userEvent.click(screen.getByText("Adicionar ao carrinho"));

    expect(addProductToCartMock).toHaveBeenCalledWith(productMock);
  });

  it("should not show add to cart button when product is already in cart", () => {
    const productMock = createRandomProduct();
    const addProductToCartMock = jest.fn();
    const isInCartMock = true;

    render(
      <ProductSuggestion
        product={productMock}
        addProductToCart={addProductToCartMock}
        isInCart={isInCartMock}
      />
    );

    expect(screen.queryByText("Adicionar ao carrinho")).not.toBeInTheDocument();
  });
});
