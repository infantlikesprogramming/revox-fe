"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <form className="w-full  mx-auto relative min-w-60">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm text-white"
      ></label>
      <div className="relative ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          // fix this later, make the autofill not change background color
          className="block w-full p-4 ps-10 text-sm rounded-full bg-[#197CFF]  text-white focus:outline-none"
          placeholder="People, topics"
          required
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            redirect(`/search/${searchTerm}`);
          }}
          className="absolute text-white absolute end-2.5 bottom-2.5  font-medium rounded-full text-sm px-4 py-2 bg-[#00BBFF] active:bg-[#015371]"
        >
          Search
        </button>
      </div>
    </form>
  );
};
export default Search;
