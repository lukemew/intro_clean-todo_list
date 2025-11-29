import { AppError } from '../app-error.js';

export class WrongEmailOrPasswordError extends AppError {
	constructor() {
		const message = 'Email or password is wrong!';

		super(message, 404);
	}
}
