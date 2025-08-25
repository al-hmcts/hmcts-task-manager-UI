export class ApiError extends Error {
  constructor(message: string, public status?: number, public cause?: Error) {
    super(message);
  }
}
