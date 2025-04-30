import React from "react";
import PersonCard from "@/components/person/PersonCard";
import { samplePeople, sampleSpeeches } from "@/constant";
import SpeechList from "@/components/SpeechList";
import {
  people as peopleSchema,
  people,
  speeches,
  topics,
} from "@/database/schema";
import { db } from "@/database/drizzle";
import { desc, eq, ilike, or, sql } from "drizzle-orm";
import peopleList from "@/components/person/PeopleList";
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
  const personId = (await params).id;
  const currentPage = Number((await searchParams)?.page || "1");
  // console.log((await params)?.page);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const personSpeeches = await db
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
      created_at: speeches.createdAt,
    })
    .from(speeches)
    .orderBy(desc(speeches.createdAt))
    .leftJoin(people, sql`${speeches.peopleId} && ARRAY[${people.id}]`)
    .where(eq(people.id, personId))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const total = await db
    .select({ count: speeches.id })
    .from(speeches)
    .leftJoin(people, sql`${speeches.peopleId} && ARRAY[${people.id}]`)
    .where(eq(people.id, personId));
  const totalCount = total.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/person/${personId}?page=${currentPage - 1}`}
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
                        href={`/person/${personId}?page=${page}`}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href={`/person/${personId}?page=${currentPage + 1}`}
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
