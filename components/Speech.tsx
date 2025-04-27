"use client";

// get the info from the database
// create a use client component to toggle transcription
import { samplePeople, sampleTranslation } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/database/drizzle";
import {
  translations,
  topics,
  people as peopleSchema,
} from "@/database/schema";
import { eq } from "drizzle-orm";
import Translation from "@/components/speech/Translation";
import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";

interface Props {
  translation: string;
  topicName: string;
  peopleName: (string | null)[];
  peopleSummary: (string | null)[];
  title: string;
  duration: string;
  sourceImage: string;
  sourceUrl: string;
  publishDate: string;
  sourceOwner: string;
  language: string;
  speechSummary: string;
  coverUrl: string;
  audioLink: string;
}

const Speech = (params: Props) => {
  return (
    <div>
      <Translation {...params} />
    </div>
  );
};
export default Speech;
