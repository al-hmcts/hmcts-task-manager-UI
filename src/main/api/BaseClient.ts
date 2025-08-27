import axios, { AxiosInstance } from 'axios';
import { ApiError } from '../models/errors/ApiError';

export abstract class BaseClient {
  protected client: AxiosInstance;

  protected readonly TOKEN_KEY = "hmcts.session.token";

  constructor(baseURL: string, token?: string) {
    this.client = axios.create({
      baseURL,
      timeout: 5000,
    });

    // Add a response interceptor for attaching Auth headers later
    this.client.interceptors.response.use(
      res => res,
      err => {
        return Promise.reject(this.formatError(err, 'API request failed'));
      }
    );

    this.client.interceptors.request.use((config: any) => {
        if (token) {
          config.headers = config.headers ?? {};
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      });
  }

  protected formatError(error: any, message: string): ApiError {
    if (error.response) {
      return new ApiError(
        `${message} (status ${error.response.status})`,
        error.response.status,
        error
      );
    }

    if (error.request) {
      return new ApiError(`${message}: no response from API`, undefined, error);
    }

    return new ApiError(`${message}: unexpected error`, undefined, error);
  }
}
