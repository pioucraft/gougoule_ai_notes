ALTER TABLE "user" DROP COLUMN IF EXISTS "email_verified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "email_verification_code";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "last_email_verification_code_sent_at";