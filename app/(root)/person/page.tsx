import React from "react";
import { people as peopleSchema, speeches } from "@/database/schema";
import PeopleList from "@/components/person/PeopleList";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// export const dynamic = "force-dynamic"; // Disable caching
const ITEMS_PER_PAGE = 10;

interface Props {
  searchParams?: { page?: string };
}
const Page = async ({ searchParams }: Props) => {
  const currentPage = Number((await searchParams)?.page || "1");
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const people = await db
    .select()
    .from(peopleSchema)
    .limit(ITEMS_PER_PAGE)
    .offset(offset);
  const total = await db.select({ count: peopleSchema.id }).from(peopleSchema);
  const totalCount = total.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  return (
    <div>
      <section className="mt-20 lg:px-24 text-center">
        <p className="text-white font-josefin-sans text-3xl md:text-6xl/22 ">
          Nhân Vật
        </p>
      </section>
      <section>
        <PeopleList people={people} />
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/person/?page=${currentPage - 1}`}
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
                        href={`/person/?page=${page}`}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href={`/person/?page=${currentPage + 1}`}
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
