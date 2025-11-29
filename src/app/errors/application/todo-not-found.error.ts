import { AppError } from "../app-error.js";

export class TodoNotFoundError extends AppError {
  constructor() {
    super("Todo not found.", 404);
  }
}
