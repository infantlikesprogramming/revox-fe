ALTER TABLE "translations" ALTER COLUMN "speech_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "translations" ALTER COLUMN "translation" SET NOT NULL;