"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/database/drizzle";
import { people as peopleSchema } from "@/database/schema";
import { eq } from "drizzle-orm";

import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

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
  people: PersonInfo[];
}

const SpeechCard = ({
  id,
  title,
  peopleId,
  sourceImage,
  sourceUrl,
  publishDate,
  sourceOwner,
  language,
  speechSummary,
  coverUrl,
  people,
}: Props) => {
  return (
    <div>
      <div className="flex flex-col  min-w-32 max-w-130  gap-4 h-full backdrop-blur-xs drop-shadow-lg  bg-blue-100/30 backdrop-blur-lg rounded-lg p-3">
        <div className="flex flex-wrap gap-2">
          <div className=" grow max-sm:flex justify-center">
            <Link href={`/speech/${id}`} className="active:opacity-60">
              <div className=" w-full min-w-60 aspect-[16/9] relative ">
                <IKImage
                  alt={title}
                  path={coverUrl}
                  transformation={[
                    { width: 480, height: 270, focus: "auto" },
                    { quality: 10 },
                  ]}
                  loading="lazy"
                  className="  rounded-lg"
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                />
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-1 max-w-60 text-left">
            {people.map(({ id, personName, org }) => (
              <Link
                key={id}
                href={`/person/${id}`}
                className="active:opacity-80"
              >
                <p className="font-bold bg-linear-to-r from-[#7EE3FF] to-[#30FF5D] bg-clip-text text-transparent">
                  {personName} - {org}
                </p>
              </Link>
            ))}
            <Link href={`/speech/${id}`}>
              <p className="text-sm">{title}</p>
            </Link>
            {/*<div className="flex flex-wrap gap-2 font-medium text-sm">*/}
            {/*  <span>*/}
            {/*    <Link href={sourceUrl} target="_blank">*/}
            {/*      <Image*/}
            {/*        className="inline-block"*/}
            {/*        src={sourceImage}*/}
            {/*        alt={"srcLogo"}*/}
            {/*        width={40}*/}
            {/*        height={30}*/}
            {/*      />*/}
            {/*    </Link>*/}
            {/*  </span>*/}

            {/*  <span className="item-gradient">{sourceOwner} •</span>*/}
            {/*  <span className="item-gradient">{publishDate} •</span>*/}
            {/*  <span className="item-gradient">{language} </span>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 font-medium text-sm items-start">
          <span className="h-2">
            <Link
              href={sourceUrl}
              target="_blank"
              className="active:opacity-60"
            >
              <Image
                className="inline-block object-[0_-10px]"
                src={sourceImage}
                alt={"srcLogo"}
                width={40}
                height={20}
              />
            </Link>
          </span>

          <span className="item-gradient">{sourceOwner} •</span>
          <span className="item-gradient">{publishDate} •</span>
          <span className="item-gradient">{language} </span>
        </div>
        <div>
          <p className="text-sm">{speechSummary}</p>
        </div>
      </div>
    </div>
  );
};
export default SpeechCard;
