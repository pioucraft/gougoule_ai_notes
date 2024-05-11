import { and, eq, isNull, or } from 'drizzle-orm';
import { db } from '../db/db';
import { conversation, note, user, type conversationType, type noteType } from '../db/schema';
import { getUserId } from './getUserId';

export async function getNote(
	noteId: number | null,
	token: string
): Promise<string | (noteType | conversationType)[]> {
	const userId = await getUserId(token);
	if (userId == false) return 'token invalid';
	if (noteId == null) {
		let notes = await db
			.select()
			.from(note)
			.where(and(isNull(note.parent), eq(note.userId, userId)));
		let conversations = await db
			.select()
			.from(conversation)
			.where(and(eq(conversation.userId, userId), isNull(conversation.parent)));
		return [...notes, ...conversations];
	}
	let notes = await db
		.select()
		.from(note)
		.where(
			or(
				and(eq(note.id, noteId), eq(note.userId, userId)),
				and(eq(note.userId, userId), eq(note.parent, noteId))
			)
		);
	if (!notes.length) return 'note note found';
	let conversations = await db
		.select()
		.from(conversation)
		.where(and(eq(conversation.userId, userId), eq(conversation.parent, noteId)));
	return [...notes, ...conversations];
}
