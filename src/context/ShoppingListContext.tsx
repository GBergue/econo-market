import React, { createContext, useState, ReactNode, useEffect, useContext} from 'react';
import { ShoppingList } from 'src/model/shopping';
import api from '../api';
import AuthContext from './AuthContext';


type ShoppingListContextProps = {
  shoppingLists: ShoppingList[],
  getList: () => void,
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
  const { isAuthenticated, getUserId } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated > 0) {
      getList();
    }
  }, [isAuthenticated])


  function getList() {
    setLoading(true);
    api.get<ShoppingList[]>(`/shopping/user/${getUserId()}`)
      .then(({ data }) => {
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