import { AppError } from '../app-error.js';

export class InvalidPasswordError extends AppError {
	constructor() {
		const message =
			'Password must be at least 8 characters long and contain at least one letter and one number';

		super(message, 400);
	}
}
