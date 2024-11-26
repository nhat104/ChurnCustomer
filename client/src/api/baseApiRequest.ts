import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';

import { store } from 'src/store';

export const baseURL = import.meta.env.VITE_APP_API_URL;

const baseApiRequest: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

baseApiRequest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const newConfig = { ...config };
  const user = localStorage.getItem('user') || '{}';
  const access_token = JSON.parse(user)?.access_token;
  newConfig.headers.Authorization = `Bearer ${access_token}`;
  return newConfig;
});

baseApiRequest.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error && error.response && error.response.status === 401) {
      // remove token
      // console.log(error.response.data);
      store.dispatch({ type: 'login/logout' });
    }
    throw error;
  }
);

export default baseApiRequest;
