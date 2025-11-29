import z from 'zod/v4';

// -----------
// Create User
// -----------
export const createUserBodySchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long.'),
	email: z.email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;

export const createUserSchema = {
	body: createUserBodySchema,
};

// ------------
// Sign In User
// ------------
export const signInUserBodySchema = z.object({
	email: z.email('Invalid email address'),
	password: z.string(),
});

export type SignInUserBody = z.infer<typeof signInUserBodySchema>;

export const signInUserSchema = {
	body: signInUserBodySchema,
};
