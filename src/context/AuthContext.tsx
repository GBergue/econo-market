import React, { createContext, useState, ReactNode} from 'react';

type AuthContext = {
  isAuthenticated: boolean,
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
}

type AuthContextProviderProps = {
  children: ReactNode,
}

const AuthContext = createContext<AuthContext>(null);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;