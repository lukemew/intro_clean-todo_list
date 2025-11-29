import { User } from "app/entities/user.entity.js";
import { EmailAlreadyExistsError } from "app/errors/application/email-already-exists.error.js";
import { CreateUserUseCase } from "app/use-cases/create-todo.use-case.js";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository.js";

let userRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(userRepository);
  });

  it("should create a new user", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const output = await sut.execute(input);

    expect(output.id).toEqual(expect.any(String));
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]?.name).toBe(input.name);
  });

  it("should throw an error if email already exists", async () => {
    const input = {
      name: "John Doe",
      email: "jane.doe@example.com",
      password: "password456",
    };

    const existingUser = await User.create(input);
    userRepository.users.push(existingUser);

    await expect(sut.execute(input)).rejects.toBeInstanceOf(
      EmailAlreadyExistsError
    );
  });
});
