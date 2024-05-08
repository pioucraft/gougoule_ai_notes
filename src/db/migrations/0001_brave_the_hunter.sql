CREATE TABLE IF NOT EXISTS "conversation" (
	"id" serial NOT NULL,
	"user_id" integer,
	"title" text,
	"body" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "note" (
	"id" serial NOT NULL,
	"children" text,
	"parent" text,
	"title" text,
	"body" text,
	"user_id" integer,
	"created_at" timestamp,
	"updated_at" timestamp
);
