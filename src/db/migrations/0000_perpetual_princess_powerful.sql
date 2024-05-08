CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"email_verified" boolean,
	"email_verification_code" text,
	"last_email_verification_code_sent_at" timestamp
);
