import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { user } from '../db/schema';

export async function getUserId(token: string): Promise<number | false> {
	let userId = await db.select().from(user).where(eq(user.token, token));
	if (!userId.length) return false;
	else return userId[0].id;
}
