import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { user } from '../db/schema';

export async function login(token: string): Promise<false | string> {
	let users = await db.select().from(user).where(eq(user.token, token));
	if (users.length) return users[0].name;
	else return false;
}
