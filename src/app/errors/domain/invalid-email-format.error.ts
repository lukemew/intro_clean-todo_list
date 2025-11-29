import { AppError } from '../app-error.js';

export class InvalidEmailFormat extends AppError {
	constructor(value: string) {
		const message = `'${value}' is not a valid email.`;

		super(message, 406);
	}
}
