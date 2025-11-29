import type { ITodoRepository } from "../repositories/todo.repository.js";

interface ListUserTodosInputDTO {
  userId: string;
}

interface ListUserTodosOutputDTO {
  todos: {
    id: string;
    title: string;
    isDone: boolean;
    createdAt: Date;
  }[];
}

export class ListUserTodosUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(input: ListUserTodosInputDTO): Promise<ListUserTodosOutputDTO> {
    const todos = await this.todoRepository.findAllByUserId(input.userId);

    return {
      todos: todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        isDone: todo.isDone,
        createdAt: todo.createdAt,
      })),
    };
  }
}
