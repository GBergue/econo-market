import { Pagination } from "src/model/pagination";
import { useState } from "react";
import api from "../api";

type UseApiProps = {
  url: string;
};

const DEFAULT_VALUE = {
  content: [],
  empty: false,
  first: true,
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

  function resetState() {
    setApiData(DEFAULT_VALUE);
  }

  function getApiData(pageNumber = 0, params = '') {
    setLoading(true);
    api.get<Pagination<T>>(`${url}?page=${pageNumber}&${params}`)
      .then(({ data }) => {
        setApiData({
          ...data,
          content: [...apiData.content, ...data.content]
        });
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
    isLoading,
    getApiData,
    loadMore,
    resetState,
  };
}