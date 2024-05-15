import type { Config } from 'drizzle-kit';

export default {
	schema: './src/db/schema.ts',
	out: './src/db/drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
	}
} satisfies Config;
