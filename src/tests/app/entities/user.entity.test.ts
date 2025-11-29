import { faker } from '@faker-js/faker';
import { User } from 'app/entities/user.entity.js';
import { AppError } from 'app/errors/app-error.js';

describe('User Entity', () => {
	it('should create an user', async () => {
		// Prepare
		const payload = {
			name: faker.person.firstName(),
			email: faker.internet.email(),
			password: faker.internet.password({
				length: 8,
				prefix: 'a1',
			}),
		};

		// Act
		const output = await User.create(payload);

		// Assert
		expect(output).toBeInstanceOf(User);
		expect(output.id).toHaveProperty('length', 36);
		expect(output.name).toBe(payload.name);
		expect(output.email).toBe(payload.email);
		expect(output.password).not.toBe(payload.password);
		expect(output.password).toHaveProperty(['length'], 60);
		expect(output.createdAt).not.toBeUndefined();
		expect(output.updatedAt).not.toBeUndefined();
		expect(output.deletedAt).toBeUndefined();
	});

	it('should not create an invalid user', async () => {
		// Prepare
		const payload = {
			name: faker.person.firstName(),
			email: faker.string.alpha({ length: 20 }),
			password: faker.string.alpha({ length: 5 }),
		};

		// Act
		const act = () => User.create(payload);

		// Assert
		await expect(act).rejects.toThrowError(AppError);
	});

	it('should update an user', async () => {
		// Prepare
		vi.useFakeTimers();

		const payload = {
				name: faker.person.firstName(),
				email: faker.internet.email(),
				password: faker.internet.password({
					length: 8,
					prefix: 'a1',
				}),
			},
			newValues = {
				name: faker.person.firstName(),
				email: faker.internet.email(),
				password: faker.internet.password({
					length: 10,
					prefix: 'a1',
				}),
			};

		const user = await User.create(payload);

		const beforeId = user.id,
			beforeCreatedAt = user.createdAt,
			beforeHash = user.password;

		// Act
		vi.advanceTimersByTime(10);

		user.changeName(newValues.name);
		user.changeEmail(newValues.email);
		await user.changePassword(newValues.password);

		// Assert
		expect(user.id).toHaveProperty('length', 36);
		expect(user.id).toBe(beforeId);
		expect(user.name).toBe(newValues.name);
		expect(user.email).toBe(newValues.email);
		expect(user.password).not.toBe(beforeHash);
		expect(user.password).toHaveProperty(['length'], 60);
		expect(user.createdAt).toBe(beforeCreatedAt);
		expect(user.updatedAt.getTime()).toBeGreaterThan(user.createdAt.getTime());
		expect(user.deletedAt).toBeUndefined();

		vi.useRealTimers();
	});
});
