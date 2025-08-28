// src/main/api/LoginClient.ts
import { LoginRequest } from "../models/request/LoginRequest";
import { BaseClient } from "./BaseClient";
import { LoginResponse } from "../models/responses/LoginResponse";
import { ENDPOINTS } from "./endpoints";

export class LoginClient extends BaseClient {
  async login(loginRequest: LoginRequest): Promise<string> {
    const { data } = await this.client.post<LoginResponse>(ENDPOINTS.login, loginRequest);
    return data.token;             
  }

  async logout(): Promise<void> {
    await this.client.post<void>(ENDPOINTS.logout);
  }
}
