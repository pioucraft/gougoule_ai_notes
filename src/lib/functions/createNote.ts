import { db } from '../../db/db';
import { note } from '../../db/schema';
import { getUserId } from './getUserId';

export async function createNote(
	parent: number | null,
	name: string,
	token: string
): Promise<string | { id: number }[]> {
	const userId = await getUserId(token);
	if (!userId) return 'token incorrect';

	return await db
		.insert(note)
		.values({
			parent: parent,
			title: name,
			userId: userId
		})
		.returning({ id: note.id });
}
