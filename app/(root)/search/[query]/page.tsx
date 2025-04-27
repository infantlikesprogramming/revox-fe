import React from "react";
import Speech from "@/components/Speech";
import { db } from "@/database/drizzle";
import { speeches, people, topics } from "@/database/schema";
import { ilike, or, sql } from "drizzle-orm";
import SpeechList from "@/components/SpeechList";

const Page = async ({ params }: { params: Promise<{ query: string }> }) => {
  const query = (await params).query.trim();
  const q = decodeURIComponent(query);
  // fake data-------------------------
  const speechFound = await db
    .selectDistinct({
      id: speeches.id,
      title: speeches.title,
      topicId: speeches.topicId,
      peopleId: speeches.peopleId,
      sourceImage: speeches.sourceImage,
      sourceUrl: speeches.sourceUrl,
      publishDate: speeches.publishDate,
      sourceOwner: speeches.sourceOwner,
      language: speeches.language,
      duration: speeches.duration,
      audioLink: speeches.audioLink,
      speechSummary: speeches.speechSummary,
      coverUrl: speeches.coverUrl,
      translationId: speeches.translationId,
    })
    .from(speeches)
    .leftJoin(people, sql`${speeches.peopleId} && ARRAY[${people.id}]`)
    .leftJoin(topics, sql`${speeches.topicId} && ARRAY[${topics.id}]`)
    .where(
      or(
        ilike(speeches.title, `%${q}%`),
        ilike(topics.topicName, `%${q}%`),
        ilike(people.personName, `%${q}%`),
      ),
    )
    .limit(10);
  // fake data-------------------------
  return (
    <div>
      {speechFound.length > 0 ? (
        <section className=" mt-10">
          <p className="text-white font-semibold text-xl pt-3 ">
            Kết quả tìm kiếm cho "{q}":
          </p>
          <SpeechList speeches={speechFound!} />
        </section>
      ) : (
        <div>
          <p className="text-white font-semibold text-xl pt-3 mt-10 ">
            Không tìm thấy quả nào cho: "{q}"
          </p>
        </div>
      )}
    </div>
  );
};
export default Page;
