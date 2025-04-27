import React from "react";
import { sampleTopics, sampleSpeeches } from "@/constant";
import SpeechList from "@/components/SpeechList";
import TopicCard from "@/components/topic/TopicCard";
import { topics, speeches, people } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq, ilike, or, sql } from "drizzle-orm";
import { arrayContains } from "drizzle-orm/sql/expressions/conditions";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const speechTopicId = (await params).id;
  // fake data-------------------------
  // fix this later: add speechesIds to topics
  const topicSpeeches = await db
    .selectDistinct({
      id: speeches.id,
      title: speeches.title,
      peopleId: speeches.peopleId,
      sourceImage: speeches.sourceImage,
      sourceUrl: speeches.sourceUrl,
      publishDate: speeches.publishDate,
      sourceOwner: speeches.sourceOwner,
      language: speeches.language,
      speechSummary: speeches.speechSummary,
      coverUrl: speeches.coverUrl,
    })
    .from(speeches)
    .leftJoin(topics, sql`${speeches.topicId} && ARRAY[${topics.id}]`)
    .where(eq(topics.id, speechTopicId));
  const topic = (
    await db.select().from(topics).where(eq(topics.id, speechTopicId)).limit(1)
  )[0];
  return (
    <div>
      <SpeedInsights />
      <section className=" mt-10 md:mt-10">
        {topic && <TopicCard {...topic!} />}
      </section>
      <section className="mt-15">
        <p className="text-xl font-semibold">
          Các bài nói chuyện trong chủ đề {topic?.topicName}
        </p>
        <SpeechList speeches={topicSpeeches} />
      </section>
    </div>
  );
};
export default Page;
