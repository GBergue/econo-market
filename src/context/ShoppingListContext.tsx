import React, { createContext, useState, ReactNode, useEffect} from 'react';
import { Alert } from 'react-native';
import { ShoppingList } from 'src/model/shopping';
import api from '../api';


type ShoppingListContextProps = {
  shoppingLists: ShoppingList[],
  getList: (id: number) => void,
  isLoading: boolean,
  setLoading: (bool: boolean) => void,
}

type ShoppingListProviderProps = {
  children: ReactNode,
}


const ShoppingListContext = createContext<ShoppingListContextProps>(null);

function ShoppingListProvider({ children }: ShoppingListProviderProps) {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [isLoading, setLoading] = useState(false);


  function getList(userId: number) {
    setLoading(true);
    console.log(userId);
    api.get<ShoppingList[]>(`/shopping/user/${userId}`)
      .then(({ data }) => {
        console.log(data);
        setShoppingLists(data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  
  return (
    <ShoppingListContext.Provider
      value={{
        shoppingLists,
        getList,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export { ShoppingListProvider };
export default ShoppingListContext;