import { db } from '../db/db';
import { eq } from 'drizzle-orm';
import { user } from '../db/schema';

export async function tryLogin(token: string): Promise<string | false> {
	let users = await db.select().from(user).where(eq(user.token, token));
	if (users.length) return users[0].name;
	else return false;
}
