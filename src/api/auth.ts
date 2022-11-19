import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { clearAuthorization, setToken } from '.';


type GetRefreshToken = {
  access_token: string;
}


const STORAGE_REFRESH_TOKEN_KEY = '@ECONO_REFRESH_TOKEN';

export async function saveInStorageRefreshToken(refreshToken: string) {
  try {
    await AsyncStorage.setItem(STORAGE_REFRESH_TOKEN_KEY, refreshToken)
  } catch (e) {
    console.log(e);
  }
}

export async function getSavedRefreshToken() {
  let refreshToken = '';
  try {
    refreshToken = await AsyncStorage.getItem(STORAGE_REFRESH_TOKEN_KEY)
  } catch(e) {
    console.log(e);
  }
  return refreshToken;
}

export async function getRefreshToken() {
  let token = null;

  const refreshToken = await getSavedRefreshToken();
  if (refreshToken) {
    setToken(refreshToken);
  }

  try {
    const { data } = await api.get('/auth/token/refresh');

    if (data.access_token) {
      setToken(data.access_token);
      token = data.access_token;
    }
  } catch (err) {
    console.log(err);
    clearAuthorization();
  }

  return token;
}
