import { AppError } from '../app-error.js';

export class InvalidUniqueEntityIdFormat extends AppError {
	constructor(value: string) {
		const message = `'${value}' is not a valid UUID.`;

		super(message, 406);
	}
}
