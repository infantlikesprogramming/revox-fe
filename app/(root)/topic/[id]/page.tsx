import React from "react";
import { sampleTopics, sampleSpeeches } from "@/constant";
import SpeechList from "@/components/SpeechList";
import TopicCard from "@/components/topic/TopicCard";
import { topics, speeches, people } from "@/database/schema";
import { db } from "@/database/drizzle";
import { desc, eq, ilike, or, sql } from "drizzle-orm";
import { arrayContains } from "drizzle-orm/sql/expressions/conditions";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const ITEMS_PER_PAGE = 10;

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ page?: string }>;
}
const Page = async ({ params, searchParams }: Props) => {
  const speechTopicId = (await params).id;
  const currentPage = Number((await searchParams)?.page || "1");
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const topicSpeeches = await db
    .selectDistinct({
      id: speeches.id,
      title: speeches.title,
      vi_title: speeches.vi_title,
      peopleId: speeches.peopleId,
      sourceImage: speeches.sourceImage,
      sourceUrl: speeches.sourceUrl,
      publishDate: speeches.publishDate,
      sourceOwner: speeches.sourceOwner,
      language: speeches.language,
      speechSummary: speeches.speechSummary,
      coverUrl: speeches.coverUrl,
      createdAt: speeches.createdAt,
    })
    .from(speeches)
    .leftJoin(topics, sql`${speeches.topicId} && ARRAY[${topics.id}]`)
    .where(eq(topics.id, speechTopicId))
    .orderBy(desc(speeches.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const total = await db
    .select({ count: speeches.id })
    .from(speeches)
    .leftJoin(topics, sql`${speeches.topicId} && ARRAY[${topics.id}]`)
    .where(eq(topics.id, speechTopicId));

  const totalCount = total.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/topic/${speechTopicId}?page=${currentPage - 1}`}
                    aria-disabled={currentPage <= 1}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href={`/topic/${speechTopicId}?page=${page}`}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href={`/topic/${speechTopicId}?page=${currentPage + 1}`}
                    aria-disabled={currentPage >= totalPages}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
    </div>
  );
};
export default Page;
