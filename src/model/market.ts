export type MarketDTO = {
  id: number,
  name: string,
  uuid: string,
  address: Address,
}

type Address = {
  locateX: number,
  locateY: number,
  street: string
}
