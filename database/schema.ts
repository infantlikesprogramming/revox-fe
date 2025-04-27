import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const speeches = pgTable("speeches", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 511 }).notNull(),
  topicName: varchar("topic_name", { length: 255 }).notNull(),
  topicId: uuid("topic_ids").array().notNull(),
  peopleId: uuid("people_ids").array().notNull(),
  sourceImage: text("source_image").notNull(),
  sourceUrl: text("source_url").notNull(),
  publishDate: date("publish_date").notNull(),
  sourceOwner: varchar("source_owner", { length: 255 }).notNull(),
  language: varchar("language", { length: 255 }).notNull(),
  duration: varchar("duration", { length: 255 }).notNull(),
  audioLink: text("audio_url").notNull(),
  speechSummary: text("speech_summary").notNull(),
  coverUrl: text("cover_url").notNull(),
  translationId: uuid("translation_id").array().notNull(),
});

export const people = pgTable("people", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  personName: varchar("person_name", { length: 255 }).notNull(),
  org: varchar("organization", { length: 255 }).notNull(),
  personImage: text("person_image").notNull(),
  shortSummary: text("short_summary").notNull(),
  longSummary: text("long_summary").notNull(),
  speechesId: uuid("speeches_id").array().notNull(),
});

export const topics = pgTable("topics", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  topicName: varchar("topic_name", { length: 255 }).notNull(),
  topicImage: text("topic_image").notNull(),
});

export const translations = pgTable("translations", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  speechId: uuid("speech_id")
    .references(() => speeches.id)
    .notNull(),
  original: text("original").notNull(),
  translation: text("translation").notNull(),
});
