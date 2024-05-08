import { drizzle } from 'drizzle-orm/postgres-js';
import { user } from './schema';
import postgres from 'postgres';

const sql = postgres(process.env.DB_URL ?? 'default-db-url', { max: 1 });
const db = drizzle(sql);

const main = async () => {
	console.log('WARNING, THIS WILL ERASE EVERYTHING IN THE DATABASE...');
	console.log('TO CANCEL, use CTRL+C');
	setTimeout(async () => {
		await db.delete(user);
		await db.insert(user).values({
			name: 'admin',
			email: 'email@email.com',
			password: 'password',
			token: 'token',
			emailVerified: true
		});
		console.log('Database seeded successfully');
		process.exit(0);
	}, 3 * 1000);
};

main();
