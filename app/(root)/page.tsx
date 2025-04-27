import Header from "@/components/Header";
import SpeechList from "@/components/SpeechList";
import { sampleSpeeches } from "@/constant";
import React from "react";
import { db } from "@/database/drizzle";
import { speeches } from "@/database/schema";
import { eq } from "drizzle-orm";
// export const dynamic = "force-dynamic"; // Disable caching

const Home = async () => {
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
    .from(speeches)
    .limit(20);

  return (
    <div>
      <section
        className="lg:mt-20 mt-15
       lg:px-24 text-center"
      >
        <p className="text-white font-josefin-sans text-3xl md:text-6xl/22 ">
          Dịch bài phát biểu, cuộc nói chuyện hay từ Tiếng Anh sang Tiếng Việt
        </p>
      </section>
      <section className="mt-20 px-5 flex flex-col">
        <p className="text-2xl font-semibold">Tiêu biểu</p>
        <SpeechList speeches={sampleSpeeches} />
      </section>
    </div>
  );
};

export default Home;
