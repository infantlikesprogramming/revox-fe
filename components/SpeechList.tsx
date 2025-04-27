import React from "react";
import SpeechCard from "@/components/SpeechCard";
import {
  people as peopleSchema,
  speeches,
  speeches as speechesSchema,
  topics,
} from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq, sql } from "drizzle-orm";

interface Props {
  id: string;
  title: string;
  peopleId: string[];
  sourceImage: string;
  sourceUrl: string;
  publishDate: string;
  sourceOwner: string;
  language: string;
  speechSummary: string;
  coverUrl: string;
}

const SpeechList = async ({ speeches }: { speeches: Props[] }) => {
  const speechIds = speeches.map((speech) => speech.id);
  const people = await db
    .selectDistinct({
      speechId: speechesSchema.id,
      personName: peopleSchema.personName,
      org: peopleSchema.org,
      id: peopleSchema.id,
    })
    .from(speechesSchema)
    .leftJoin(
      peopleSchema,
      sql`${speechesSchema.peopleId} && ARRAY[${peopleSchema.id}]`,
    );

  return (
    <div>
      <div className="  flex flex-wrap justify-center gap-2 lg:gap-10 sm:gap-5 mt-5 md:px-5">
        {speeches.map((speech) => {
          const speakers = people
            .filter(({ speechId }) => speechId === speech.id)
            .map((person) => {
              return {
                id: person.id,
                org: person.org,
                personName: person.personName,
              };
            });
          return <SpeechCard key={speech.id} {...speech} people={speakers} />;
        })}
      </div>
    </div>
  );
};
export default SpeechList;
