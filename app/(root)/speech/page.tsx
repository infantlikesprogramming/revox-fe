import React from "react";
import { db } from "@/database/drizzle";
import { speeches } from "@/database/schema";
import { eq } from "drizzle-orm";
import SpeechList from "@/components/SpeechList";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Page = async () => {
  // fake data-------------------------
  const sampleSpeeches = await db
    .select({
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
    .from(speeches);
  // fake data-------------------------
  return (
    <div>
      <SpeedInsights />
      <section className=" mt-10 md:mt-10"></section>
      <section className="mt-15">
        <p className="text-xl font-semibold">Các bài nói chuyện trong chủ đề</p>
      </section>
      <SpeechList speeches={sampleSpeeches} />
    </div>
  );
};
export default Page;
