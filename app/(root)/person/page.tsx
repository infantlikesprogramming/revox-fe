import React from "react";
import { people as peopleSchema } from "@/database/schema";
import PeopleList from "@/components/person/PeopleList";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
const Page = async () => {
  const people = await db.select().from(peopleSchema);
  return (
    <div>
      <section className="mt-20 lg:px-24 text-center">
        <p className="text-white font-josefin-sans text-3xl md:text-6xl/22 ">
          Nhân Vật
        </p>
      </section>
      <section>
        <PeopleList people={people} />
      </section>
    </div>
  );
};
export default Page;
