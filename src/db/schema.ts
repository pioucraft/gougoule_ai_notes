import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id'),
	name: text('name'),
	email: text('email'),
	password: text('password'),
	emailVerified: boolean('email_verified'),
	emailVerificationCode: text('email_verification_code'),
	lastEmailVerificationCodeSentAt: timestamp('last_email_verification_code_sent_at')
});
