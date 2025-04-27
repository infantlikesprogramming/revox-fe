import React from "react";
import { sampleSpeeches } from "@/constant";
import Speech from "@/components/Speech";
import { db } from "@/database/drizzle";
import { people, speeches, topics, translations } from "@/database/schema";
import { eq, ilike, or, sql } from "drizzle-orm";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const speechId = (await params).id;
  // fake data-------------------------
  const result = await db
    .selectDistinct({
      title: speeches.title,
      sourceImage: speeches.sourceImage,
      sourceUrl: speeches.sourceUrl,
      publishDate: speeches.publishDate,
      sourceOwner: speeches.sourceOwner,
      language: speeches.language,
      duration: speeches.duration,
      audioLink: speeches.audioLink,
      speechSummary: speeches.speechSummary,
      coverUrl: speeches.coverUrl,
      topicName: topics.topicName,
      peopleName: people.personName,
      peopleSummary: people.shortSummary,
    })
    .from(speeches)
    .leftJoin(people, sql`${speeches.peopleId} && ARRAY[${people.id}]`)
    .leftJoin(topics, sql`${speeches.topicId} && ARRAY[${topics.id}]`)
    .where(eq(speeches.id, speechId));

  const translation = await db
    .select({ translation: translations.translation })
    .from(translations)
    .where(eq(translations.speechId, speechId))
    .limit(1)
    .then((result) => result[0].translation);

  const peopleName = result.map(({ peopleName }) => peopleName);
  // const topicName = result.map(({topicName}) => topicName);
  const topicName = result[0].topicName!;
  const peopleSummary = result.map(({ peopleSummary }) => peopleSummary);

  // fake data-------------------------
  return (
    <div>
      <section className=" mt-10 md:mt-10">
        <Speech
          translation={translation}
          topicName={topicName}
          peopleName={peopleName}
          peopleSummary={peopleSummary}
          title={result[0].title}
          duration={result[0].duration}
          sourceImage={result[0].sourceImage}
          sourceUrl={result[0].sourceUrl}
          publishDate={result[0].publishDate}
          sourceOwner={result[0].sourceOwner}
          language={result[0].language}
          speechSummary={result[0].speechSummary}
          coverUrl={result[0].coverUrl}
          audioLink={result[0].audioLink}
        />
      </section>
    </div>
  );
};
export default Page;
