import { atom, useAtom } from "jotai";
import { Product } from "../components/Cart/types";

export type ProductInCart = Product & {
  quantity: number;
};

const cartAtom = atom([] as ProductInCart[]);

const useCart = () => useAtom(cartAtom);

export default useCart;
