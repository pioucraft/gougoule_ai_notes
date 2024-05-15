import { drizzle } from 'drizzle-orm/postgres-js';
import { conversation, note, user } from './schema';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';

const sql = postgres(
	`postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
	{ max: 1 }
);
const db = drizzle(sql);

const main = async () => {
	console.log('WARNING, THIS WILL ERASE EVERYTHING IN THE DATABASE...');
	console.log('TO CANCEL, use CTRL+C');
	setTimeout(async () => {
		await db.delete(user);
		await db.delete(conversation);
		await db.delete(note);

		await db.insert(user).values({
			name: 'admin',
			email: 'email@email.com',
			password: await Bun.password.hash('password'),
			token: 'TOKEN'
		});

		const userFromDb = await db.select().from(user).where(eq(user.email, 'email@email.com'));
		if (!userFromDb[0]) throw new Error('Could not find user');
		const userId = userFromDb[0].id;

		await db.insert(note).values({
			body: 'Things to do : \n - Eat potatoes\n - Play piano',
			title: 'Title cool yeah',
			userId: userId
		});

		await db.insert(note).values({
			body: 'Do you like Linux for gaming ?',
			title: 'Title cool yeah 2',
			userId: userId
		});

		const noteFromDB = await db.select().from(note).where(eq(note.userId, userId));
		if (!noteFromDB[0]) throw new Error('Could not note');
		const noteId = noteFromDB[0].id;

		await db.insert(note).values({
			body: 'I like Spiderman',
			title: 'Title cool yeah 3',
			userId: userId,
			parent: noteId
		});

		const conversationBody = [
			{
				role: 'user',
				content: 'Hello',
				date: new Date(),
				id: 0
			},
			{
				role: 'assistant',
				content: 'Hello, how are you ?',
				date: new Date(),
				id: 1
			},
			{
				role: 'user',
				content: 'Potato',
				date: new Date(),
				id: 2
			},
			{
				role: 'assistant',
				content:
					"Do you really like potatoes ? If yes, I'd love to give you more informations about them",
				date: new Date(),
				id: 3
			}
		];
		await db.insert(conversation).values({
			userId: userId,
			body: JSON.stringify([
				...conversationBody,
				...conversationBody,
				...conversationBody,
				...conversationBody,
				...conversationBody,
				...conversationBody,
				...conversationBody,
				...conversationBody
			])
		});

		await db.insert(conversation).values({
			userId: userId,
			parent: noteId,
			title: 'Old conversation'
		});

		await db.insert(note).values({
			title: 'Bonjour',
			body: 'Hello',
			userId: userId
		});
		console.log('Database seeded successfully');
		process.exit(0);
	}, 3 * 1000);
};

main();
