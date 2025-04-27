import React from "react";
import PersonCard from "@/components/person/PersonCard";

const PeopleList = ({ people }: { people: Person[] }) => {
  return (
    <div className="mt-15 px-5 flex flex-col gap-15">
      {people.map((person) => (
        <PersonCard key={person.id} {...person} />
      ))}
    </div>
  );
};
export default PeopleList;
