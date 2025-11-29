import { Todo } from "../entities/todo-entity.js";
import type { ITodoRepository } from "../repositories/todo.repository.js";

interface CreateTodoInputDTO {
  title: string;
  description?: string | undefined;
}

interface CreateTodoOutputDTO {
  id: string;
  title: string;
  description: string | null | undefined;
  isDone: boolean;
  createdAt: Date;
}

export class CreateTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(input: CreateTodoInputDTO): Promise<CreateTodoOutputDTO> {
    const todo = Todo.create({
      title: input.title,

      description: input.description ?? null,
    });

    await this.todoRepository.create(todo);

    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isDone: todo.isDone,
      createdAt: todo.createdAt,
    };
  }
}
