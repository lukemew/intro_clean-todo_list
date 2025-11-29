import z from "zod";

export const createTodoBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export const updateTodoBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isDone: z.boolean().optional(),
});

export const todoParamsSchema = z.object({
  id: z.string(),
});

export type CreateTodoBody = z.infer<typeof createTodoBodySchema>;
export type UpdateTodoBody = z.infer<typeof updateTodoBodySchema>;
export type TodoParams = z.infer<typeof todoParamsSchema>;
