import { drizzle } from 'drizzle-orm/postgres-js';
import { conversation, note, user } from './schema';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';

const sql = postgres(`postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, { max: 1 });
const db = drizzle(sql);

const main = async () => {
	console.log('WARNING, THIS WILL ERASE EVERYTHING IN THE DATABASE...');
	console.log('TO CANCEL, use CTRL+C');
	setTimeout(async () => {
		await db.delete(user);
		await db.delete(conversation)
		await db.delete(note)

		await db.insert(user).values({
			name: 'admin',
			email: 'email@email.com',
			password: await Bun.password.hash('password'),
			token: 'TOKEN'
		});

		const userFromDb = await db.select().from(user).where(eq(user.email, "email@email.com"));
		if(!userFromDb[0]) throw new Error('Could not find user')
		const userId = userFromDb[0].id;
		
		await db.insert(note).values({
			"body": "HI !",
			"title": "Title cool yeah",
			"userId": userId
		})

		await db.insert(note).values({
			"body": "second note",
			"title": "Title cool yeah 2",
			"userId": userId
		})

		const noteFromDB = await db.select().from(note).where(eq(note.userId, userId));
		if(!noteFromDB[0]) throw new Error('Could not note')
		const noteId = noteFromDB[0].id;

		await db.insert(note).values({
			"body": "3 note",
			"title": "Title cool yeah 3",
			"userId": userId,
			"parent": noteId
		})

		await db.insert(conversation).values({
			"userId": userId
		})

		const secondNoteFromDB = await db.select().from(note).where(eq(note.userId, userId));
		if(!secondNoteFromDB[0]) throw new Error('Could not find note')
		const secondNoteId = secondNoteFromDB[2].id;


		await db.insert(conversation).values({
			"userId": userId,
			"parent": noteId,
			"title": "Old conversation"
		})

		const conversationFromDB = await db.select().from(conversation).where(eq(conversation.userId, userId));
		if(!conversationFromDB[0]) throw new Error('Could not find conversation')
		const conversationId = conversationFromDB[1].id;

		await db.update(note).set({children: JSON.stringify([`ai-${conversationId}`, secondNoteId])}).where(eq(note.id, noteId));
		
		await db.insert(note).values({
			"title": "Bonjour",
			"userId": userId
		})
		console.log('Database seeded successfully');
		process.exit(0);
	}, 3 * 1000);
};

main();
