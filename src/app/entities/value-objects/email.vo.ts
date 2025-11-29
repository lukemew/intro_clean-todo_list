import { InvalidEmailFormat } from '../../errors/domain/invalid-email-format.error.js';

export class Email {
	public readonly value: string;

	private constructor(value: string) {
		this.value = value;

		Object.freeze(this);
	}

	public static create(email: string): Email {
		if (!Email.validate(email)) throw new InvalidEmailFormat(email);

		return new Email(email);
	}

	public static fromTrusted(email: string): Email {
		return new Email(email);
	}

	private static validate(email: string): boolean {
		if (!email) return false;

		const emailRegex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return emailRegex.test(email);
	}
}
