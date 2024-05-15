import { and, eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { conversation } from '../../db/schema';
import { getUserId } from './getUserId';

export async function deleteConversation(token: string, id: number): Promise<string> {
	const userId = await getUserId(token);
	if (!userId) return 'token incorrect';

	await db
		.delete(conversation)
		.where(and(eq(conversation.userId, userId), eq(conversation.id, id)));

	return 'success';
}
