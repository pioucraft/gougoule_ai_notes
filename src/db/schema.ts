import { pgTable, serial, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id'),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	emailVerified: boolean('email_verified').notNull().default(false),
	emailVerificationCode: text('email_verification_code'),
	lastEmailVerificationCodeSentAt: timestamp('last_email_verification_code_sent_at'),
	token: text('token').notNull()
});

export const note = pgTable('note', {
	id: serial('id'),
	children: text('children'),
	parent: text('parent'),
	title: text('title').notNull(),
	body: text('body'),
	userId: integer('user_id').notNull(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at')
});

export const conversation = pgTable('conversation', {
	id: serial('id'),
	userId: integer('user_id').notNull(),
	title: text('title').notNull().default('New Conversation'),
	body: text('body')
});
