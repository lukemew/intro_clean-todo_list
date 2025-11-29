import type { FastifyReply, FastifyRequest } from "fastify";
import type { UpdateTodoUseCase } from "../../../app/use-cases/update-todo.use-case.js";
import type { TodoParams, UpdateTodoBody } from "../dtos/todo.dto.js";

export class UpdateTodoController {
  constructor(private readonly updateTodoUseCase: UpdateTodoUseCase) {}

  async handle(
    request: FastifyRequest<{ Params: TodoParams; Body: UpdateTodoBody }>,
    reply: FastifyReply
  ) {
    const userId = request.user.sub;
    const { id } = request.params;
    const { title, description, isDone } = request.body;

    const output = await this.updateTodoUseCase.execute({
      userId,
      todoId: id,
      title,
      description,
      isDone,
    });

    return reply.status(200).send(output);
  }
}
