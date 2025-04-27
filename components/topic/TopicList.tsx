import React from "react";
import TopicCard from "@/components/topic/TopicCard";

const TopicList = ({ topicList }: { topicList: Topic[] }) => {
  return (
    <div className="mt-13 px-5 flex flex-wrap gap-15 sm:gap-30 justify-center">
      {topicList.map((topic) => (
        <TopicCard key={topic.id} {...topic} />
      ))}
    </div>
  );
};
export default TopicList;
