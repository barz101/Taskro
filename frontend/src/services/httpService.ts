import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3030/api/'

var axios = Axios.create({
    withCredentials: true
});

export const GET = (url: string, params?: any, config?: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios.get(BASE_URL + url, { params, ...config }).then((res: AxiosResponse) => {
        resolve(res.data);
      }).catch((error: any) => reject(error));
    });
  };
  
  export const POST = (url: string, data?: any, config?: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios.post(BASE_URL + url, data, config)
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((error: any) => reject(error));
    });
  };
  
  export const PUT = (url: string, data?: any, config?: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios.put(BASE_URL + url, data, config)
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((error: any) => reject(error));
    });
  };
  
  export const DELETE = (url: string, config?: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios.delete(BASE_URL + url, config)
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((error: any) => reject(error));
    });
  };

