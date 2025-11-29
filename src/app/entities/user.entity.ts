import { Entity } from './entity.js';
import { Email } from './value-objects/email.vo.js';
import { Password } from './value-objects/password.vo.js';

interface UserProps {
	name: string;
	email: Email;
	password: Password;
}

export type UserPrimitiveProps = Omit<UserProps, 'email' | 'password'> & {
	email: string;
	password: string;
};

export class User extends Entity<UserProps> {
	private constructor(
		{ email, name, password }: UserProps,
		id?: string,
		createdAt?: Date,
		updatedAt?: Date,
		deletedAt?: Date,
	) {
		super({ email, name, password }, id, createdAt, updatedAt, deletedAt);
	}

	public static async create(
		{ name, email, password }: UserPrimitiveProps,
		id?: string,
	): Promise<User> {
		const userProps = {
			name,
			email: Email.create(email),
			password: await Password.create(password),
		} satisfies UserProps;

		return new User(userProps, id);
	}

	public static reconstitute(
		{ email, name, password }: UserPrimitiveProps,
		id: string,
		createdAt: Date,
		updatedAt: Date,
		deletedAt?: Date,
	) {
		const userProps = {
			name,
			email: Email.fromTrusted(email),
			password: Password.createFromHash(password),
		} satisfies UserProps;

		return new User(userProps, id, createdAt, updatedAt, deletedAt);
	}

	public get name() {
		return this.props.name;
	}

	public get email(): string {
		return this.props.email.value;
	}

	public get password(): string {
		return this.props.password.value;
	}

	public comparePassword(password: string): Promise<boolean> {
		return this.props.password.compare(password);
	}

	public changeName(name: string) {
		this.props.name = name;

		this.touch();
	}

	public changeEmail(email: string) {
		this.props.email = Email.create(email);

		this.touch();
	}

	public async changePassword(plainTextPassword: string) {
		this.props.password = await Password.create(plainTextPassword);

		this.touch();
	}
}
