import React from "react";
import TopicList from "@/components/topic/TopicList";
import { db } from "@/database/drizzle";
import { topics } from "@/database/schema";
const Page = async () => {
  const allTopics = await db.select().from(topics);
  return (
    <div>
      <section className="mt-20 lg:px-24 text-center">
        <p className="text-white font-josefin-sans text-3xl md:text-6xl/22 ">
          Chủ Đề
        </p>
      </section>
      <section>
        <TopicList topicList={allTopics} />
      </section>
    </div>
  );
};
export default Page;
