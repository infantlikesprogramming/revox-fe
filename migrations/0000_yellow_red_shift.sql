CREATE TABLE "people" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"person_name" varchar(255) NOT NULL,
	"organization" varchar(255) NOT NULL,
	"person_image" text NOT NULL,
	"short_summary" text NOT NULL,
	"long_summary" text NOT NULL,
	"speeches_id" uuid[] NOT NULL,
	CONSTRAINT "people_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "speeches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(511) NOT NULL,
	"topic_name" varchar(255) NOT NULL,
	"topic_ids" uuid[] NOT NULL,
	"people_ids" uuid[] NOT NULL,
	"source_image" text NOT NULL,
	"source_url" text NOT NULL,
	"publish_date" date NOT NULL,
	"source_owner_id" varchar(255) NOT NULL,
	"language" varchar(255) NOT NULL,
	"duration" varchar(255) NOT NULL,
	"speech_summary" text NOT NULL,
	"cover_url" text NOT NULL,
	"translation_id" uuid[] NOT NULL,
	CONSTRAINT "speeches_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_name" varchar(255) NOT NULL,
	"topic_image" text NOT NULL,
	CONSTRAINT "topics_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "translations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"speech_id" uuid NOT NULL,
	"original" text NOT NULL,
	"translation" text NOT NULL,
	CONSTRAINT "translations_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "translations" ADD CONSTRAINT "translations_speech_id_speeches_id_fk" FOREIGN KEY ("speech_id") REFERENCES "public"."speeches"("id") ON DELETE no action ON UPDATE no action;