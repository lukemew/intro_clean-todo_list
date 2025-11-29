import z from 'zod/v4';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	PORT: z.coerce.number<number>().default(3000),
	JWT_SECRET: z
		.string()
		.default(
			'c25e96d8037514336f8de9b395c92d675da31d982de79a82f4d142f99f8ef60c',
		),
	DB_HOST: z.string(),
	DB_PORT: z.coerce.number<number>().default(5432),
	DB_NAME: z.string(),
	DB_USER: z.string(),
	DB_PASS: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error('❌ Invalid environment variables: ', _env.error.format());

	throw new Error('Invalid environment variables.');
}

export const env = _env.data;

export const isDev = env.NODE_ENV === 'development';

export const isTest = env.NODE_ENV === 'test';

export const isProd = env.NODE_ENV === 'production';
