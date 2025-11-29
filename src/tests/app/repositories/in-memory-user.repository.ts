import type { User } from 'app/entities/user.entity.js';
import type { IUserRepository } from 'app/repositories/user.repository.js';

export class InMemoryUserRepository implements IUserRepository {
	public users: User[] = [];

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email);

		return user ?? null;
	}

	async findById(id: string): Promise<User | null> {
		const user = this.users.find((user) => user.id === id);

		return user ?? null;
	}

	async save(user: User): Promise<void> {
		const index = this.users.findIndex(({ id }) => id === user.id);

		if (index >= 0) this.users[index] = user;
		else this.users.push(user);
	}
}
