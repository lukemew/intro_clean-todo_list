import type { Repository } from 'typeorm';
import type { User } from '../../../../app/entities/user.entity.js';
import type { IUserRepository } from '../../../../app/repositories/user.repository.js';
import { UserMapper } from '../mappers/user.mapper.js';
import type { UserModel } from '../models/user.model.js';

export class TypeORMUserRepository implements IUserRepository {
	constructor(private readonly ormRepository: Repository<UserModel>) {}

	async save(user: User): Promise<void> {
		const userModel = UserMapper.toPersistence(user);

		await this.ormRepository.save(userModel);
	}

	async findById(id: string): Promise<User | null> {
		const userModel = await this.ormRepository.findOneBy({ id });

		if (!userModel) return null;

		return UserMapper.toDomain(userModel);
	}

	async findByEmail(email: string): Promise<User | null> {
		const userModel = await this.ormRepository.findOneBy({ email });

		if (!userModel) return null;

		return UserMapper.toDomain(userModel);
	}
}
