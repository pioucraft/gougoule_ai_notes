import { pgTable, serial, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id'),
	name: text('name'),
	email: text('email'),
	password: text('password'),
	emailVerified: boolean('email_verified'),
	emailVerificationCode: text('email_verification_code'),
	lastEmailVerificationCodeSentAt: timestamp('last_email_verification_code_sent_at')
});

export const note = pgTable('note', {
	id: serial('id'),
	children: text('children'),
	parent: text('parent'),
	title: text('title'),
	body: text('body'),
	userId: integer('user_id'),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});

export const conversation = pgTable('conversation', {
	id: serial('id'),
	userId: integer('user_id'),
	title: text('title'),
	body: text('body')
});
