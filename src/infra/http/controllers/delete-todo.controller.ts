import type { FastifyReply, FastifyRequest } from "fastify";
import type { DeleteTodoUseCase } from "../../../app/use-cases/delete-todo.use-case.js";
import type { TodoParams } from "../dtos/todo.dto.js";

export class DeleteTodoController {
  constructor(private readonly deleteTodoUseCase: DeleteTodoUseCase) {}

  async handle(
    request: FastifyRequest<{ Params: TodoParams }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    await this.deleteTodoUseCase.execute({
      todoId: id,
    });

    return reply.status(204).send();
  }
}
