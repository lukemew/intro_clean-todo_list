import { AppError } from '../app-error.js';

export default class IdCollisionError extends AppError {
	public constructor() {
		super('An legendary UUID collision has appeared! Please try again.', 409);
	}
}
