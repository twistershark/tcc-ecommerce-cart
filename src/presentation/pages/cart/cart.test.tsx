import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { Cart } from ".";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createRandomProducts } from "../../../__tests__/__mocks__/domain/entities/mock-product";
import productsController from "../../controllers/products-controller";
import cartController from "../../controllers/cart-controller";

// Mocking dependencies
jest.mock("../../store/cart", () => ({
  __esModule: true,
  default: jest.fn(() => [[], jest.fn()]),
}));

jest.mock("../../../utils/formatCurrency", () => ({
  __esModule: true,
  formatCurrency: jest.fn(),
}));

jest.mock("../../controllers/cart-controller", () => ({
  __esModule: true,
  default: {
    updateProductInCartQuantity: jest.fn(),
    addProductToCart: jest.fn(),
    removeProductFromCart: jest.fn(),
  },
}));

jest.mock("../../controllers/products-controller", () => ({
  __esModule: true,
  default: {
    getProductsSuggestions: jest.fn(() => Promise.resolve([])),
  },
}));

describe("Cart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Cart page with empty cart", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
    });

    expect(
      screen.getByText(/Nenhum produto adicionado ao carrinho!/i)
    ).toBeInTheDocument();
  });

  it("should render the Cart page with non-empty cart", async () => {
    const productsMock = createRandomProducts(5);
    jest
      .spyOn(productsController, "getProductsSuggestions")
      .mockResolvedValue([]);

    act(() => {
      jest
        .requireMock("../../store/cart")
        .default.mockReturnValue([productsMock, jest.fn()]);
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
    });

    productsMock.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it("should handle quantity increment and decrement", async () => {
    const productsMock = createRandomProducts(1);
    jest
      .spyOn(productsController, "getProductsSuggestions")
      .mockResolvedValue([]);

    act(() => {
      jest
        .requireMock("../../store/cart")
        .default.mockReturnValue([productsMock, jest.fn()]);
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
    });

    const incrementButton = screen.getByTestId(
      `increment-button-${productsMock[0].productId}`
    );

    await userEvent.click(incrementButton);

    expect(cartController.updateProductInCartQuantity).toHaveBeenCalledWith(
      {
        product: productsMock[0],
        cart: productsMock,
        setCart: expect.any(Function),
      },
      2
    );

    const decrementButton = screen.getByTestId(
      `decrement-button-${productsMock[0].productId}`
    );
    await userEvent.click(decrementButton);

    expect(cartController.updateProductInCartQuantity).toHaveBeenCalledWith(
      {
        product: productsMock[0],
        cart: productsMock,
        setCart: expect.any(Function),
      },
      0
    );
  });

  it("should handle clear cart correctly", async () => {
    const productsMock = createRandomProducts(1);
    const setCartMock = jest.fn();
    jest
      .spyOn(productsController, "getProductsSuggestions")
      .mockResolvedValue([]);

    act(() => {
      jest
        .requireMock("../../store/cart")
        .default.mockReturnValue([productsMock, setCartMock]);
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
    });

    await userEvent.click(screen.getByText("Limpar carrinho"));

    expect(setCartMock).toHaveBeenCalledWith([]);
  });

  it("should handle remove product from cart correctly", async () => {
    const productsMock = createRandomProducts(1);
    const setCartMock = jest.fn();
    jest
      .spyOn(productsController, "getProductsSuggestions")
      .mockResolvedValue([]);

    act(() => {
      jest
        .requireMock("../../store/cart")
        .default.mockReturnValue([productsMock, setCartMock]);
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
    });

    await userEvent.click(
      screen.getByTestId(`remove-button-${productsMock[0].productId}`)
    );

    expect(cartController.removeProductFromCart).toHaveBeenCalledWith({
      product: productsMock[0],
      cart: productsMock,
      setCart: setCartMock,
    });
  });

  it("should handle add product to cart correctly", async () => {
    const productsMock = createRandomProducts(4);
    jest
      .spyOn(productsController, "getProductsSuggestions")
      .mockResolvedValue(productsMock);

    await act(async () => {
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
    });

    const productSuggestions = screen.getAllByText("Adicionar ao carrinho");

    await userEvent.click(productSuggestions[0]);

    expect(cartController.addProductToCart).toHaveBeenCalled();
  });

  it("should render products suggestions", async () => {
    const productsMock = createRandomProducts(4);
    jest
      .spyOn(productsController, "getProductsSuggestions")
      .mockResolvedValue(productsMock);

    await act(async () => {
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
    });

    const addToCartSuggestionButtons = screen.getAllByText(
      "Adicionar ao carrinho"
    );

    addToCartSuggestionButtons.forEach((suggestion) =>
      expect(suggestion).toBeInTheDocument()
    );

    productsMock.forEach((product) =>
      expect(screen.getByText(product.name)).toBeInTheDocument()
    );
  });

  it("should render products suggestions without add to cart button", async () => {
    const productsMock = createRandomProducts(4);
    const setCartMock = jest.fn();

    jest
      .spyOn(productsController, "getProductsSuggestions")
      .mockResolvedValue(productsMock);

    await act(async () => {
      jest
        .requireMock("../../store/cart")
        .default.mockReturnValue([productsMock, setCartMock]);
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
    });

    const addToCartSuggestionButtons = screen.queryAllByText(
      "Adicionar ao carrinho"
    );

    expect(addToCartSuggestionButtons).toHaveLength(0);
  });
});
