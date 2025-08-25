import axios, { AxiosInstance } from 'axios';

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
        console.error(`API error: ${err.message}`);
        return Promise.reject(err);
      }
    );
  }
}