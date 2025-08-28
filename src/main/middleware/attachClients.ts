import { NextFunction, Request, Response } from "express";
import { LoginClient } from "../api/LoginClient";
import { TaskClient } from "../api/TaskClient";
import type { TokenProvider } from "../api/BaseClient";

export function attachClients(apiBaseUrl: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const tokenProvider: TokenProvider = () => (req.session as any).authToken;

    // Request-scoped clients instantiated upon requests 
    // (safe for multi-user, no token leakage)
    (req as any).clients = {
      login: new LoginClient(apiBaseUrl, tokenProvider),
      tasks: new TaskClient(apiBaseUrl, tokenProvider),
    };

    next();
  };
}
