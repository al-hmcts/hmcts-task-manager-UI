import axios, { AxiosInstance } from 'axios';
import { ApiError } from '../models/errors/ApiError';

export abstract class BaseClient {
  protected client: AxiosInstance;

  constructor(baseURL: string) {
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
