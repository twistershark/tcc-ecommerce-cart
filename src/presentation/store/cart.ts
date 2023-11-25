import { atom, useAtom } from "jotai";
import { ProductInCart } from "../../domain/entities/product";

const cartAtom = atom([] as ProductInCart[]);

const useCart = () => useAtom(cartAtom);

export default useCart;
