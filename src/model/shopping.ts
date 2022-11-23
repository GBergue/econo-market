import { ProductDTO } from "./product";

export type ShoppingList = {
  id: number,
  uuid: string,
  name: string,
  totalPrice: number,
  productList: InListProduct[],
}

export type InListProduct = {
  product: ProductDTO,
  quantity: number,
  priceXQuantity: number,
}
