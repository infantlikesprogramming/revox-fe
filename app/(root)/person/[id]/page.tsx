import React from "react";
import PersonCard from "@/components/person/PersonCard";
import { samplePeople, sampleSpeeches } from "@/constant";
import SpeechList from "@/components/SpeechList";
import { people, speeches, topics } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq, ilike, or, sql } from "drizzle-orm";
import peopleList from "@/components/person/PeopleList";
import { SpeedInsights } from "@vercel/speed-insights/next";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const personId = (await params).id;
  const personSpeeches = await db
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
    .leftJoin(people, sql`${speeches.peopleId} && ARRAY[${people.id}]`)
    .where(eq(people.id, personId));
  const person = (
    await db.select().from(people).where(eq(people.id, personId)).limit(1)
  )[0];
  return (
    <div>
      <SpeedInsights />
      <section className=" mt-10 md:mt-20">
        {person && <PersonCard {...person!} />}
      </section>
      <section className="mt-10">
        <p className="text-xl font-semibold">
          Các bài nói chuyện của {person?.personName}
        </p>
        <SpeechList speeches={personSpeeches} />
      </section>
    </div>
  );
};
export default Page;
