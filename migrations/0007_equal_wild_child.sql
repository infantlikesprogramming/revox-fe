ALTER TABLE "speeches" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "speeches" ADD COLUMN "vi_title" varchar(511);