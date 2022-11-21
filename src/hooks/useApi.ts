import { Pagination } from "src/model/pagination";
import { useState } from "react";
import api from "../api";

type UseApiProps = {
  url: string;
};

const DEFAULT_VALUE = {
  content: [],
  first: false,
  empty: false,
  last: false,
  numberOfElements: 0,
  totalElements: 0,
  totalPages: 0,
  pageable: {
    pageNumber: 0,
  },
}

export default function useApi<T>({ url }: UseApiProps) {
  const [ apiData, setApiData ] = useState<Pagination<T>>(DEFAULT_VALUE);
  const [ isLoading, setLoading ] = useState(false);


  function getApiData(pageNumber = 0, params = '', reset = false) {
    setLoading(true);
    api.get<Pagination<T>>(`${url}?page=${pageNumber}&${params}`)
      .then(({ data }) => {
        setApiData(reset ? data : {
            ...data,
            content: [...apiData.content, ...data.content]
          }
        );
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }


  function loadMore(params = '') {
    if (!isLoading && !apiData.last) {
      getApiData(apiData.pageable.pageNumber + 1, params);
    }
  }
  

  return {
    apiData,
    setApiData,
    isLoading,
    getApiData,
    loadMore,
  };
}