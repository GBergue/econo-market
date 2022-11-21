import React, { createContext, useState, ReactNode, useEffect} from 'react';
import { Alert } from 'react-native';
import jwtDecode from 'jwt-decode';

import { TokenInfo } from 'src/model/token';

import { getRefreshToken } from '../api/auth';
import { LocationObject } from 'expo-location';


type LocationContext = {
  location: LocationObject,
  setLocation: React.Dispatch<React.SetStateAction<LocationObject>>,
}

type LocationContextProviderProps = {
  children: ReactNode,
}

const LocationContext = createContext<LocationContext>(null);

function LocationContextProvider({ children }: LocationContextProviderProps) {
  const [location, setLocation] = useState<LocationObject>();

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export { LocationContextProvider };
export default LocationContext;