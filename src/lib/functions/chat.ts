import { and, eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { note, type conversationType } from '../../db/schema';
import { getUserId } from './getUserId';
import axios from 'axios';
import { client } from '../../db/QdrantDb';
import { DB_NAME } from '$env/static/private';

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
		
		await client.upsert(DB_NAME, {
			wait: true,
			points : [
				{ id: noteToUpdate.id, vector: embedding.data.embedding, payload: {"content": noteToUpdate.body, "title": noteToUpdate.title} },
			]
		})
		await db.update(note).set({
			"upToDateVector": true
		}).where(eq(note.id, noteToUpdate.id));
	}
}
