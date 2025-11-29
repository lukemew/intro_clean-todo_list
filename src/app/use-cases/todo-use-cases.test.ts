import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTodoRepository } from "../repositories/in-memory-todo.repository.js";
import { CreateTodoUseCase } from "../../app/use-cases/create-todo.use-case.js";
import { UpdateTodoUseCase } from "../../app/use-cases/update-todo.use-case.js";
import { DeleteTodoUseCase } from "../../app/use-cases/delete-todo.use-case.js";
import { TodoNotFoundError } from "../../app/errors/application/todo-not-found.error.js";

describe("Todo Use Cases (Integration)", () => {
  let todoRepository: InMemoryTodoRepository;
  let createTodo: CreateTodoUseCase;

  let updateTodo: UpdateTodoUseCase;
  let deleteTodo: DeleteTodoUseCase;

  beforeEach(() => {
    todoRepository = new InMemoryTodoRepository();
    createTodo = new CreateTodoUseCase(todoRepository);
    updateTodo = new UpdateTodoUseCase(todoRepository);
    deleteTodo = new DeleteTodoUseCase(todoRepository);
  });

  it("should be able to run a full todo lifecycle", async () => {
    const userId = "user-01";

    const created = await createTodo.execute({
      title: "Terminar o projeto",
      description: "Fazer testes unitários",
    });

    expect(created.id).toBeDefined();
    expect(created.title).toBe("Terminar o projeto");
    expect(created.isDone).toBe(false);

    const updated = await updateTodo.execute({
      todoId: created.id,
      isDone: true,
      title: "Projeto Finalizado",
    });

    expect(updated.isDone).toBe(true);
    expect(updated.title).toBe("Projeto Finalizado");

    await deleteTodo.execute({
      todoId: created.id,
    });
  });

  it("should not be able to update or delete a non-existing todo", async () => {
    await expect(() =>
      updateTodo.execute({
        todoId: "fake-id",
        title: "New Title",
      })
    ).rejects.toBeInstanceOf(TodoNotFoundError);

    await expect(() =>
      deleteTodo.execute({
        todoId: "fake-id",
      })
    ).rejects.toBeInstanceOf(TodoNotFoundError);
  });

  it("should only list todos from the specific user", async () => {});
});
