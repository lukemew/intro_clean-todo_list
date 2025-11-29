import type { ITodoRepository } from "../repositories/todo.repository.js";

interface ListTodosOutputDTO {
  todos: {
    id: string;
    title: string;
    isDone: boolean;
    createdAt: Date;
  }[];
}

export class ListTodosUseCase {
  // Mudou o nome
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(): Promise<ListTodosOutputDTO> {
    // Sem input
    const todos = await this.todoRepository.findAll();

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
