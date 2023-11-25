import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Cart } from ".";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Cart", () => {
  it("should render the page correctly", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("Seu carrinho")).toBeInTheDocument();
    expect(
      screen.getByText("Nenhum produto adicionado ao carrinho!")
    ).toBeInTheDocument();
    expect(screen.getByText("Talvez você goste")).toBeInTheDocument();
    expect(screen.getByText("Total com taxa: R$ 5,99")).toBeInTheDocument();
  });

  it("should be able to add a suggested product to cart", async () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const suggestedProductsAddToCartButtons = screen.getAllByRole("button", {
      name: "Adicionar ao carrinho",
    });

    await userEvent.click(suggestedProductsAddToCartButtons[0]);

    expect(
      screen.queryByText("Total produtos: R$ 5,99")
    ).not.toBeInTheDocument();
  });
});
