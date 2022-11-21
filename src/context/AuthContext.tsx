import React, { createContext, useState, ReactNode, useEffect} from 'react';
import { Alert } from 'react-native';
import jwtDecode from 'jwt-decode';

import { TokenInfo } from 'src/model/token';

import { getRefreshToken } from '../api/auth';


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

  async function refreshTheToken() {
    const success = await getRefreshToken();
    if (!success) {
      Alert.alert('', 'Erro de conexão!');
      setAuthenticated(0);
    }
  }

  async function validateIfTokenValid() {
    const access_token = await getRefreshToken();

    if (access_token) {
      const { user_id } = jwtDecode<TokenInfo>(access_token);
      setAuthenticated(user_id);
    }
  }

  useEffect(() => {
    validateIfTokenValid();
  }, []);

  
  useEffect(() => {
    let timerId;
    if (isAuthenticated > 0) {
      timerId = setInterval(() => {
        refreshTheToken();
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