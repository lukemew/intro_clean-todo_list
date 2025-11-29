import { compare, hash } from 'bcrypt';
import { InvalidPasswordError } from '../../errors/domain/invalid-password.error.js';

export class Password {
	public readonly value: string;
	private static readonly SALT_ROUNDS = 10;

	private constructor(value: string) {
		this.value = value;

		Object.freeze(this);
	}

	public static createFromHash(hashedValue: string): Password {
		return new Password(hashedValue);
	}

	public static async create(plainTextPassword: string): Promise<Password> {
		if (!Password.validate(plainTextPassword)) throw new InvalidPasswordError();

		const hashedValue = await hash(plainTextPassword, Password.SALT_ROUNDS);

		return new Password(hashedValue);
	}

	private static validate(password: string): boolean {
		const isBiggerEnough = password.length >= 8;

		const hasLetter = /[a-zA-Z]/.test(password);

		const hasNumber = /[0-9]/.test(password);

		return isBiggerEnough && hasLetter && hasNumber;
	}

	public compare(plainTextPassword: string): Promise<boolean> {
		return compare(plainTextPassword, this.value);
	}
}
