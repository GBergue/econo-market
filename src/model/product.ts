import { MarketDTO } from "src/model/market";
import { BrandDTO } from "./brand";
import { CategoryDTO } from "./category";

export type Product = {
  id: number;
  name: string;
  price: number;
  brand: string,
  market: string,
  date: string,
  unid: string,
}

export type ProductDTO = {
  id: number;
  greaterThanLastPrice: boolean;
  name: string;
  price: number;
  brand: BrandDTO;
  category: CategoryDTO;
  markets: MarketDTO[];
  date: string,
  unity: string,
}
