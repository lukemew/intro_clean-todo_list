import type { FastifyInstance } from "fastify";
import { TypeOrmTodoRepository } from "../../database/typeorm/repositories/todo.repository.js";
import { CreateTodoUseCase } from "../../../app/use-cases/create-todo.use-case.js";
import { ListUserTodosUseCase } from "../../../app/use-cases/list-user-todos.use-case.js";
import { UpdateTodoUseCase } from "../../../app/use-cases/update-todo.use-case.js";
import { DeleteTodoUseCase } from "../../../app/use-cases/delete-todo.use-case.js";
import { CreateTodoController } from "../controllers/create-todo.controller.js";
import { ListUserTodosController } from "../controllers/list-users-todo.controller.js";
import { UpdateTodoController } from "../controllers/update-todo.controller.js";
import { DeleteTodoController } from "../controllers/delete-todo.controller.js";
import {
  createTodoBodySchema,
  todoParamsSchema,
  updateTodoBodySchema,
} from "../dtos/todo.dto.js";

export async function todoRoutes(app: FastifyInstance) {
  const todoRepository = new TypeOrmTodoRepository();

  const createTodoUseCase = new CreateTodoUseCase(todoRepository);
  const listUserTodosUseCase = new ListUserTodosUseCase(todoRepository);
  const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
  const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

  const createTodoController = new CreateTodoController(createTodoUseCase);
  const listUserTodosController = new ListUserTodosController(
    listUserTodosUseCase
  );
  const updateTodoController = new UpdateTodoController(updateTodoUseCase);
  const deleteTodoController = new DeleteTodoController(deleteTodoUseCase);

  app.post(
    "/todos",
    {
      onRequest: [async (req) => await req.jwtVerify()],
      schema: {
        body: createTodoBodySchema,
      },
    },
    async (request, reply) => {
      return createTodoController.handle(request as any, reply);
    }
  );

  app.get(
    "/todos",
    {
      onRequest: [async (req) => await req.jwtVerify()],
    },
    async (request, reply) => {
      return listUserTodosController.handle(request as any, reply);
    }
  );

  app.patch(
    "/todos/:id",
    {
      onRequest: [async (req) => await req.jwtVerify()],
      schema: {
        params: todoParamsSchema,
        body: updateTodoBodySchema,
      },
    },
    async (request, reply) => {
      return updateTodoController.handle(request as any, reply);
    }
  );

  app.delete(
    "/todos/:id",
    {
      onRequest: [async (req) => await req.jwtVerify()],
      schema: {
        params: todoParamsSchema,
      },
    },
    async (request, reply) => {
      return deleteTodoController.handle(request as any, reply);
    }
  );
}
