import { db } from '../db/db';
import { eq } from 'drizzle-orm';
import { user } from '../db/schema';

export async function login(email: string, password: string): Promise<string> {
	let users = await db.select().from(user).where(eq(user.email, email));
	if (!users.length) return 'user does not exist';
	if (!(await Bun.password.verify(password, users[0].password))) return 'password incorrect';
	else return users[0].token;
}
