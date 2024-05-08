ALTER TABLE "conversation" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "conversation" ALTER COLUMN "title" SET DEFAULT 'New Conversation';--> statement-breakpoint
ALTER TABLE "conversation" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email_verified" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email_verified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "token" SET NOT NULL;