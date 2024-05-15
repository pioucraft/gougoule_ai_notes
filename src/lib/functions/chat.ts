import { and, eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { note, type conversationType } from '../../db/schema';
import { getUserId } from './getUserId';
import axios from 'axios';

export async function chat(
	id: number,
	question: string,
	token: string
): Promise<string | conversationType> {
	const userId = await getUserId(token);
	if (!userId) return 'token incorrect';

	let notesToUpdate = await db
		.select()
		.from(note)
		.where(and(eq(note.userId, userId), eq(note.upToDateVector, false)));

	for (let noteToUpdate of notesToUpdate) {
		let embedding = await axios.post('http://127.0.0.1:11434/api/embeddings', {
			prompt: noteToUpdate.body,
			model: process.env.OLLAMA_EMBEDDING_MODEL
		});
		console.log('embedding');
	}
}
