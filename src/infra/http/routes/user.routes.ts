import type { FastifyInstance } from "fastify";
import { CreateUserUseCase } from "../../../app/use-cases/create-todo.use-case.js";
import { SignInUserUseCase } from "../../../app/use-cases/sign-in-user.use-case.js";
import { AppDataSource } from "../../database/typeorm/data-source.js";
import { UserModel } from "../../database/typeorm/models/user.model.js";
import { TypeORMUserRepository } from "../../database/typeorm/repositories/user.repository.js";
import { FastifyJwtTokenProvider } from "../../providers/fastify-jwt-token.provider.js";
import { CreateUserController } from "../controllers/create-user.controller.js";
import { SignInUserController } from "../controllers/sign-in-user.controller.js";
import { createUserSchema, signInUserSchema } from "../dtos/user.dto.js";

export async function userRoutes(app: FastifyInstance) {
  const typeOrmUserRepository = new TypeORMUserRepository(
      AppDataSource.getRepository(UserModel)
    ),
    fastifyJwtTokenProvider = new FastifyJwtTokenProvider(app);

  const createUserUseCase = new CreateUserUseCase(typeOrmUserRepository),
    createUserController = new CreateUserController(createUserUseCase);

  app.post(
    "/users",
    {
      schema: createUserSchema,
    },
    createUserController.handle.bind(createUserController)
  );

  const signInUserUseCase = new SignInUserUseCase(
      typeOrmUserRepository,
      fastifyJwtTokenProvider
    ),
    signInUserController = new SignInUserController(signInUserUseCase);

  app.post(
    "/signin",
    {
      schema: signInUserSchema,
    },
    signInUserController.handle.bind(signInUserController)
  );
}
