import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const sql = postgres(`postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, { max: 1 });
const db = drizzle(sql);

const main = async () => {
	try {
		await migrate(db, { migrationsFolder: 'src/db/migrations' });
		console.log('Migration completed');
		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

main();
