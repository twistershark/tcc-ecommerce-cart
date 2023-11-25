import { Entity } from "./entity";

export enum Category {
  PURSES = "Bolsas",
  MAN = "Masculina",
  WOMAN = "Feminina",
}

export type Product = Entity & {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  category: Category;
};

export type ProductInCart = Product & {
  quantity: number;
};
