ALTER TABLE "speeches" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "people" ADD COLUMN "english_summary" text;