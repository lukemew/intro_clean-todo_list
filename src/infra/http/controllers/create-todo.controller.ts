import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateTodoUseCase } from "../../../app/use-cases/create-todo.use-case.js";
import type { CreateTodoBody } from "../dtos/todo.dto.js";
export class CreateTodoController {
  constructor(private readonly createTodoUseCase: CreateTodoUseCase) {}

  async handle(
    request: FastifyRequest<{ Body: CreateTodoBody }>,
    reply: FastifyReply
  ) {
    const { title, description } = request.body;

    const output = await this.createTodoUseCase.execute({
      title,
      description,
    });

    return reply.status(201).send(output);
  }
}
