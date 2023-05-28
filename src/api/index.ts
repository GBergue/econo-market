import axios from 'axios'
import { SERVER_URL } from 'server-info';


const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000, // 30s
});

export function setToken(access_token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
}

export function clearAuthorization() {
  api.defaults.headers.common.Authorization = '';
}


export default api;