import { describe, it, expect } from "vitest";
import { Todo } from "../entities/todo-entity.js";
import { UniqueEntityID } from "../entities/value-objects/unique-entity-id.vo.js";

describe("Todo Entity", () => {
  it("should be able to create a new todo", () => {
    const todo = Todo.create({
      title: "Estudar Clean Architecture",
      description: "Ler o livro do Uncle Bob",
    });

    expect(todo).toBeTruthy();
    expect(todo.id).toBeTruthy();
    expect(todo.title).toBe("Estudar Clean Architecture");
    expect(todo.isDone).toBe(false);
    expect(todo.createdAt).toBeInstanceOf(Date);
  });

  it("should be able to restore a todo with existing ID", () => {
    const existingId = "123e4567-e89b-12d3-a456-426614174000";
    const todo = Todo.create(
      {
        title: "Tarefa antiga",
      },
      existingId
    );

    expect(todo.id).toBe(existingId);
  });

  it("should be able to mark a todo as done", () => {
    const todo = Todo.create({
      title: "Tarefa",
    });

    expect(todo.isDone).toBe(false);

    todo.markAsDone();

    expect(todo.isDone).toBe(true);

    expect(todo.updatedAt).toBeInstanceOf(Date);
  });

  it("should be able to update title", () => {
    const todo = Todo.create({
      title: "Título Antigo",
    });

    todo.updateTitle("Título Novo");

    expect(todo.title).toBe("Título Novo");
  });
});
