import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
} from 'axios';

import { clearAuth } from '../../hooks/Auth';

class Api {
  instance: AxiosInstance;

  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    this.instance = axios.create({
      baseURL,
    });
  }

  private handleError = (error: AxiosError): boolean => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        clearAuth();
        window.location.reload();
      }

      if (status === 500) {
        if (data.name === 'TokenExpiredError') {
          clearAuth();
          window.location.reload();
        }
      }
    }
    return false;
  };

  get = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    try {
      const response = await this.instance.get<T>(url, config);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };

  post = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };

  put = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };

  delete = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    try {
      const response = await this.instance.delete<T>(url, config);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };
}

export default {
  createInstance: (baseURL: string) => {
    const api = new Api(baseURL);
    return { ...api.instance, ...api };
  },
};
