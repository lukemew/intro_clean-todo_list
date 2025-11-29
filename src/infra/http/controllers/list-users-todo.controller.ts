import type { FastifyReply, FastifyRequest } from "fastify";
import type { ListUserTodosUseCase } from "../../../app/use-cases/list-user-todos.use-case.js";

export class ListUserTodosController {
  constructor(private readonly listUserTodosUseCase: ListUserTodosUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub;

    const output = await this.listUserTodosUseCase.execute({
      userId,
    });

    return reply.status(200).send(output);
  }
}
