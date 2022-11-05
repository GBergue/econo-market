import { Product } from "./product";

export type ShoppingList = {
  id: number,
  uuid: string,
  productList: Product[],
}