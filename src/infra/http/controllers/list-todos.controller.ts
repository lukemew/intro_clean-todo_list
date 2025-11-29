import type { FastifyReply, FastifyRequest } from "fastify";
import type { ListTodosUseCase } from "../../../app/use-cases/list-user-todos.use-case.js";

export class ListTodosController {
  constructor(private readonly listTodosUseCase: ListTodosUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const output = await this.listTodosUseCase.execute();

    return reply.status(200).send(output);
  }
}
