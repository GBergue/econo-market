export type Pagination<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
}

type Pageable = {
  pageNumber: number;
}
