CREATE TABLE IF NOT EXISTS "conversation" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"title" text DEFAULT 'New Conversation' NOT NULL,
	"body" text DEFAULT '[]' NOT NULL,
	"parent" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "note" (
	"id" serial NOT NULL,
	"parent" integer,
	"title" text NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"token" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
