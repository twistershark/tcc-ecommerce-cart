import { fakerPT_BR as faker } from "@faker-js/faker";
import { Category, ProductInCart } from "../../../../domain/entities/product";

const categories = Object.keys(Category);

export const mockCategory = (): Category =>
  faker.helpers.arrayElement(categories) as Category;

export function createRandomProduct(): ProductInCart {
  return {
    id: faker.string.uuid(),
    category: mockCategory(),
    name: faker.commerce.productName(),
    color: faker.color.human(),
    image: faker.image.urlPlaceholder(),
    quantity: 1,
    price: Number(faker.commerce.price()),
    productId: faker.string.uuid(),
    version: "1",
  };
}

export function createRandomProducts(amount: number): ProductInCart[] {
  return faker.helpers.multiple(createRandomProduct, {
    count: amount,
  });
}
