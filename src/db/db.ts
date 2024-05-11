import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, DEVELOPMENT } from '$env/static/private';

const sql = postgres(`postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
	max: 1
});
export const db = drizzle(sql, { schema, logger: DEVELOPMENT == 'true' });
