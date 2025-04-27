import React from "react";
import TopicList from "@/components/topic/TopicList";
import { db } from "@/database/drizzle";
import { topics, people } from "@/database/schema";
// import TranslationForm from "@/components/forms/TranslationForm";
const Page = async () => {
  const allTopics = await db.select().from(topics);
  const allPeople = await db.select().from(people);
  const displayTopics = allTopics.map((topic, index) => {
    return index.toString() + " : " + topic.topicName;
  });
  const displayPeople = allPeople.map((person, index) => {
    return (
      index.toString() + " : " + person.personName + " : " + person.shortSummary
    );
  });
  return (
    <div>
      <section>
        {/*<TranslationForm topics={displayTopics} people={displayPeople} />*/}
      </section>
    </div>
  );
};
export default Page;
