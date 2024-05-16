import { and, eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { conversation, note, type conversationType } from '../../db/schema';
import { getUserId } from './getUserId';
import axios from 'axios';
import { client } from '../../db/QdrantDb';
import {
	DB_NAME,
	OLLAMA_EMBEDDING_MODEL,
	CONTEXT_NOTES_LIMIT,
	GROQ_API_KEY,
	GROQ_MODEL
} from '$env/static/private';

export async function chat(
	id: number,
	question: string,
	token: string
): Promise<
	| string
	| {
			role: 'user' | 'assistant';
			content: string;
			date: string;
			id: number;
	  }[]
> {
	const userId = await getUserId(token);
	if (!userId) return 'token incorrect';

	let notesToUpdate = await db
		.select()
		.from(note)
		.where(and(eq(note.userId, userId), eq(note.upToDateVector, false)));

	for (let noteToUpdate of notesToUpdate) {
		let embedding = await axios.post('http://127.0.0.1:11434/api/embeddings', {
			prompt: noteToUpdate.body,
			model: OLLAMA_EMBEDDING_MODEL
		});

		await client.upsert(DB_NAME, {
			wait: true,
			points: [
				{
					id: noteToUpdate.id,
					vector: embedding.data.embedding,
					payload: { content: noteToUpdate.body, title: noteToUpdate.title }
				}
			]
		});
		await db
			.update(note)
			.set({
				upToDateVector: true
			})
			.where(eq(note.id, noteToUpdate.id));
	}

	const contextEmbedding: number[] = (
		await axios.post('http://127.0.0.1:11434/api/embeddings', {
			prompt: question,
			model: OLLAMA_EMBEDDING_MODEL
		})
	).data.embedding;

	const context = JSON.stringify(
		(
			await client.search(DB_NAME, {
				vector: contextEmbedding,
				limit: parseInt(CONTEXT_NOTES_LIMIT)
			})
		).map((x) => x.payload)
	);

	const currentConversation = await db
		.select()
		.from(conversation)
		.where(and(eq(conversation.userId, userId), eq(conversation.id, id)));
	if (!currentConversation.length) return 'conversation not found';
	let currentConversationHistory: {
		role: 'user' | 'assistant';
		content: string;
		date: string;
		id: number;
	}[] = JSON.parse(currentConversation[0].body);
	currentConversationHistory.push({
		role: 'user',
		content: question,
		date: new Date().toISOString(),
		id: currentConversationHistory.length
	});

	const answer = await axios.post(
		'https://api.groq.com/openai/v1/chat/completions',
		{
			messages: [
				{
					role: 'system',
					content: `In this conversation, don't hesitate to be funny, and to respond with some playful responses. Remember to be brutally honnest. Here's some context to help you answer the question : ${context}`
				},
				...currentConversationHistory.map((x) => {
					return { role: x.role, content: x.content };
				})
			],
			model: GROQ_MODEL
		},
		{ headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Accept-Encoding': 'gzip, deflate' } }
	);
	currentConversationHistory.push({
		role: 'assistant',
		content: answer.data.choices[0].message.content,
		date: new Date().toISOString(),
		id: currentConversationHistory.length
	});
	return JSON.parse(
		(
			await db
				.update(conversation)
				.set({ body: JSON.stringify(currentConversationHistory) })
				.where(and(eq(conversation.userId, userId), eq(conversation.id, id)))
				.returning({ body: conversation.body })
		)[0].body
	);
}
