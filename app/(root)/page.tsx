import Header from "@/components/Header";
import SpeechList from "@/components/SpeechList";
import { sampleSpeeches } from "@/constant";
import React from "react";
import { db } from "@/database/drizzle";
import { speeches } from "@/database/schema";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { desc, asc } from "drizzle-orm";
// export const dynamic = "force-dynamic"; // Disable caching

interface Props {
  searchParams?: { page?: string };
}
const ITEMS_PER_PAGE = 10;
const Home = async ({ searchParams }: Props) => {
  const currentPage = Number((await searchParams)?.page || "1");
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const sampleSpeeches = await db
    .select({
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
    })
    .from(speeches)
    .orderBy(desc(speeches.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const totalSpeeches = await db.select({ count: speeches.id }).from(speeches);
  const totalCount = totalSpeeches.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/?page=${currentPage - 1}`}
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
                        href={`/?page=${page}`}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href={`/?page=${currentPage + 1}`}
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

export default Home;
