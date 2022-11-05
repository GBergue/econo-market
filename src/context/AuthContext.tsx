import React, { createContext, useState, ReactNode, useEffect} from 'react';
import { Alert } from 'react-native';
import api, { setToken, clearAuthorization } from '../api';

type AuthContext = {
  isAuthenticated: number,
  setAuthenticated: React.Dispatch<React.SetStateAction<number>>,
  getUserId: () => number,
}

type AuthContextProviderProps = {
  children: ReactNode,
}

const SEGUNDO = 1000;

const AuthContext = createContext<AuthContext>(null);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState<number>(0);

  useEffect(() => {
    let timerId;
    if (isAuthenticated > 0) {
      timerId = setInterval(() => {
        api.get('/auth/token/refresh')
          .then(({ data }) => {
            const { access_token } = data;
            if (access_token) {
              setToken(access_token);
            }
          })
          .catch((err) => {
            console.log(err);
            Alert.alert('', 'Erro de conexão!');
            setAuthenticated(0);
            clearAuthorization();
          });
      }, 60 * SEGUNDO);
    }

    return () => {
      if (timerId) clearTimeout(timerId)
    };
  }, [isAuthenticated]);

  
  function getUserId() {
    return isAuthenticated;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        getUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;