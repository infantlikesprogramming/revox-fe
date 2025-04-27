"use server";
import React from "react";
import { allPeople } from "@/lib/admin/actions/translation";

const DisplayPeople = () => {
  const peopleDisplay = allPeople();
  return (
    <div className="rounded-md bg-gray-600 text-white">
      <p>{peopleDisplay}</p>
    </div>
  );
};
export default DisplayPeople;
