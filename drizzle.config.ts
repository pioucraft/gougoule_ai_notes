import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./",
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  }
} satisfies Config;