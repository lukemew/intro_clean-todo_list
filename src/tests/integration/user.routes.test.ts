import { faker } from '@faker-js/faker';
import { AppDataSource } from 'infra/database/typeorm/data-source.js';
import { UserModel } from 'infra/database/typeorm/models/user.model.js';
import { server } from 'infra/http/server.js';

describe('User Routes', () => {
	beforeAll(async () => {
		await AppDataSource.initialize();
		await server.ready();
	});

	afterEach(async () => {
		const repository = AppDataSource.getRepository(UserModel);
		await repository.clear();
	});

	afterAll(async () => {
		await AppDataSource.destroy();
		await server.close();
	});

	describe('POST /users', () => {
		it('should create a new user and return 201', async () => {
			const userData = {
				name: faker.person.firstName(),
				email: faker.internet.email(),
				password: faker.internet.password({
					length: 8,
					prefix: 'a1',
				}),
			};

			const response = await server.inject({
				method: 'POST',
				url: '/users',
				payload: userData,
			});

			const body = response.json();

			expect(response.statusCode).toBe(201);
			expect(body.id).toEqual(expect.any(String));
			expect(body.name).toBe(userData.name);
			expect(body.email).toBe(userData.email);

			const dbUser = await AppDataSource.getRepository(UserModel).findOneBy({
				email: userData.email,
			});
			expect(dbUser).not.toBeNull();
			expect(dbUser?.name).toBe(userData.name);
		});

		it('should return 409 when email already exists', async () => {
			const userData = {
				name: faker.person.firstName(),
				email: faker.internet.email(),
				password: faker.internet.password({
					length: 8,
					prefix: 'a1',
				}),
			};

			// First request to create the user
			await server.inject({
				method: 'POST',
				url: '/users',
				payload: userData,
			});

			// Second request with the same email
			const response = await server.inject({
				method: 'POST',
				url: '/users',
				payload: {
					...userData,
					name: 'Another Name',
				},
			});

			// const body = response.json();

			expect(response.statusCode).toBe(409);

			const dbLength = await AppDataSource.getRepository(UserModel).count();
			expect(dbLength).toBe(1);
		});
	});
});
