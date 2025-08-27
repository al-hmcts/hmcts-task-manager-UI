import { LoginRequest } from "models/request/LoginRequest";
import { BaseClient } from "./BaseClient";
import { LoginResponse } from "models/responses/LoginResponse";
import { ENDPOINTS } from "./endpoints";

export class LoginClient extends BaseClient {

  protected readonly TOKEN_KEY = "hmcts.session.token";

  async login(loginRequest: LoginRequest): Promise<string> {
    const response = await this.client.post<LoginResponse>(ENDPOINTS.login, loginRequest);
    return response.data.token; // return token so caller can put it in session
  }

  async logout(): Promise<void> {
    await this.client.post<LoginResponse>(ENDPOINTS.logout);
    this.clearToken();
  }

  private clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  
}