import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id'),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	token: text('token').notNull()
});

export type userType = typeof user.$inferSelect;

export const note = pgTable('note', {
	id: serial('id'),
	parent: integer('parent'),
	title: text('title').notNull(),
	body: text('body').notNull().default(''),
	userId: integer('user_id').notNull(),
	createdAt: timestamp('created_at').notNull().default(new Date()),
	updatedAt: timestamp('updated_at').notNull().default(new Date()),
	upToDateVector: boolean('upToDateVector').notNull().default(false)
});

export type noteType = typeof note.$inferSelect;

export const conversation = pgTable('conversation', {
	id: serial('id'),
	userId: integer('user_id').notNull(),
	title: text('title').notNull().default('New Conversation'),
	body: text('body').notNull().default('[]'),
	parent: integer('parent')
});

export type conversationType = typeof conversation.$inferSelect;
