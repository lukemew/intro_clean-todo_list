import type { FastifyInstance } from "fastify";
import { TypeOrmTodoRepository } from "../../database/typeorm/repositories/todo.repository.js";
import { CreateTodoUseCase } from "../../../app/use-cases/create-todo.use-case.js";
import { ListTodosUseCase } from "../../../app/use-cases/list-user-todos.use-case.js"; // Atenção ao nome novo
import { UpdateTodoUseCase } from "../../../app/use-cases/update-todo.use-case.js";
import { DeleteTodoUseCase } from "../../../app/use-cases/delete-todo.use-case.js";
import { CreateTodoController } from "../controllers/create-todo.controller.js";
import { ListTodosController } from "../controllers/list-todos.controller.js"; // Atenção ao nome novo
import { UpdateTodoController } from "../controllers/update-todo.controller.js";
import { DeleteTodoController } from "../controllers/delete-todo.controller.js";
import {
  createTodoBodySchema,
  todoParamsSchema,
  updateTodoBodySchema,
} from "../dtos/todo.dto.js";

export async function todoRoutes(app: FastifyInstance) {
  // 1. Instancia o Repositório (Conexão com Banco)
  const todoRepository = new TypeOrmTodoRepository();

  // 2. Instancia os Casos de Uso (Lógica)
  const createTodoUseCase = new CreateTodoUseCase(todoRepository);
  const listTodosUseCase = new ListTodosUseCase(todoRepository);
  const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
  const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

  // 3. Instancia os Controllers (Quem recebe a requisição)
  const createTodoController = new CreateTodoController(createTodoUseCase);
  const listTodosController = new ListTodosController(listTodosUseCase);
  const updateTodoController = new UpdateTodoController(updateTodoUseCase);
  const deleteTodoController = new DeleteTodoController(deleteTodoUseCase);

  // --- ROTAS ---

  // POST /todos (Criar)
  app.post(
    "/todos",
    {
      schema: {
        body: createTodoBodySchema,
      },
    },
    async (request, reply) => {
      // Usamos 'as any' para evitar briga de tipos com o Zod
      return createTodoController.handle(request as any, reply);
    }
  );

  // GET /todos (Listar tudo)
  app.get(
    "/todos",
    // Removemos o schema e o hook de autenticação
    async (request, reply) => {
      return listTodosController.handle(request as any, reply);
    }
  );

  // PATCH /todos/:id (Atualizar)
  app.patch(
    "/todos/:id",
    {
      schema: {
        params: todoParamsSchema,
        body: updateTodoBodySchema,
      },
    },
    async (request, reply) => {
      return updateTodoController.handle(request as any, reply);
    }
  );

  // DELETE /todos/:id (Apagar)
  app.delete(
    "/todos/:id",
    {
      schema: {
        params: todoParamsSchema,
      },
    },
    async (request, reply) => {
      return deleteTodoController.handle(request as any, reply);
    }
  );
}
