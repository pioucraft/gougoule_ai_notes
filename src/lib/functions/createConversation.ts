import { db } from '../../db/db';
import { conversation } from '../../db/schema';
import { getUserId } from './getUserId';

export async function createConversation(
	parent: number | null,
	name: string,
	token: string
): Promise<string | { id: number }[]> {
	const userId = await getUserId(token);
	if (!userId) return 'token incorrect';

	return await db
		.insert(conversation)
		.values({
			parent: parent,
			title: name,
			userId: userId
		})
		.returning({ id: conversation.id });
}
