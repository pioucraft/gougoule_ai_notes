import { and, eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { note } from '../../db/schema';
import { getUserId } from './getUserId';

export async function deleteNote(
	token: string,
	id: number
): Promise<string> {
	const userId = await getUserId(token);
	if (!userId) return 'token incorrect';

	await db
		.delete(note)
		.where(and(eq(note.userId, userId), eq(note.id, id)))

	return "success"
}
