import axios, { AxiosInstance } from 'axios';
import { ApiError } from '../models/errors/ApiError';

export type TokenProvider = () => string | undefined;

export abstract class BaseClient {
  protected client: AxiosInstance;
  private getToken?: TokenProvider;

  constructor(baseURL: string, tokenProvider?: TokenProvider) {
    this.client = axios.create({ baseURL, timeout: 5000 });
    this.getToken = tokenProvider;

    // Attach bearer token dynamically per request
    this.client.interceptors.request.use((config: any) => {
      const token = this.getToken?.();
      if (token) {
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      res => res,
      err => Promise.reject(this.formatError(err, 'API request failed'))
    );
  }

  protected formatError(error: any, message: string): ApiError {
    if (error.response) {
      return new ApiError(`${message} (status ${error.response.status})`, error.response.status, error);
    }
    if (error.request) {
      return new ApiError(`${message}: no response from API`, undefined, error);
    }
    return new ApiError(`${message}: unexpected error`, undefined, error);
  }
}
