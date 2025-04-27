"use client";
import { useState } from "react";
import Link from "next/link";
export const revalidate = 86400; // Cache for 24 hours
interface Props {
  topics: Topic[];
  people: Person[];
}
export default function CustomNavbar({ topics, people }: Props) {
  const [isPersonOpen, setIsPersonOpen] = useState(false);
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  return (
    <div className="flex flex-wrap sm:justify-end justify-center font-semibold">
      <Link href="/" className="nav-item">
        Home
      </Link>
      <Link href="/user/admin" className="nav-item">
        Admin
      </Link>
      <Link href="/about" className="nav-item">
        About
      </Link>

      <div className="nav-item">
        <div
          className="flex items-center"
          onMouseEnter={() => setIsPersonOpen(true)}
          onMouseLeave={() => setIsPersonOpen(false)}
        >
          <Link href="/person">Person</Link>
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>

        <div
          className={`absolute z-10 bg-[#5FBE70] divide-y divide-gray-100 rounded-lg shadow-sm w-full sm:w-[150px] transition-all duration-300 ease-in-out ${
            isPersonOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={() => setIsPersonOpen(true)}
          onMouseLeave={() => setIsPersonOpen(false)}
        >
          <ul className="pb-2 text-sm ">
            {people.map(({ id, personName }) => (
              <li key={id}>
                <a
                  href={`/person/${id}`}
                  className="block truncate text-amber-100 text-center mt-2 hover:text-amber-500"
                >
                  <p>{personName}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="nav-item ">
        <div
          className="flex items-center mx-4"
          onMouseEnter={() => setIsTopicOpen(true)}
          onMouseLeave={() => setIsTopicOpen(false)}
        >
          <Link href={"/topic"}>Topic</Link>
          <svg
            className="w-2.5 h-2.5 ml-2.5 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>

        <div
          className={`absolute z-10 bg-[#5FBE70] divide-y divide-gray-100 rounded-lg shadow-sm w-[120px] transition-all duration-300 ease-in-out ${
            isTopicOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={() => setIsTopicOpen(true)}
          onMouseLeave={() => setIsTopicOpen(false)}
        >
          <ul className="pb-2 text-sm ">
            {topics.map(({ id, topicName }) => (
              <li key={id}>
                <a
                  href={`/topic/${id}`}
                  className="block truncate text-amber-100 text-center mt-2 hover:text-amber-500"
                >
                  <p>{topicName}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
