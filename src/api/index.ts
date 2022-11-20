import axios from 'axios'


const api = axios.create({
  baseURL: 'https://api-economarket.herokuapp.com',
});

export function setToken(access_token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
}

export function clearAuthorization() {
  api.defaults.headers.common.Authorization = '';
}


export default api;