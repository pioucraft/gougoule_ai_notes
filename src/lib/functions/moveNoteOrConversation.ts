import { and, eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { conversation, note } from '../../db/schema';
import { getUserId } from './getUserId';

export async function moveNoteOrConversation(
	parent: number | null,
	id: string,
	token: string
): Promise<'token incorrect' | 'success' | 'parent is the same as the id'> {
	if (typeof parent == 'number' && parent.toString() == id) return 'parent is the same as the id';

	const userId = await getUserId(token);
	if (!userId) return 'token incorrect';

	if (id.startsWith('ai-')) {
		await db
			.update(conversation)
			.set({
				parent: parent
			})
			.where(
				and(eq(conversation.id, Number(id.replace('ai-', ''))), eq(conversation.userId, userId))
			);
	} else {
		await db
			.update(note)
			.set({
				parent: parent
			})
			.where(and(eq(note.id, Number(id)), eq(note.userId, userId)));
	}
	return 'success';
}
