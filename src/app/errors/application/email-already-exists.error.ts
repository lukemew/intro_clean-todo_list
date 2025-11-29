import { AppError } from '../app-error.js';

export class EmailAlreadyExistsError extends AppError {
	constructor(email: string) {
		const message = `The email '${email}' is already been used!`;

		super(message, 409);
	}
}
