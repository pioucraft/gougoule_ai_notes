import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DB_URL, DEVELOPMENT } from '$env/static/private';

const sql = postgres(DB_URL as string, { max: 1 });
export const db = drizzle(sql, { schema, logger: DEVELOPMENT == 'true' });
