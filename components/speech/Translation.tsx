"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import config from "@/lib/config";
import { IKImage, ImageKitProvider } from "imagekitio-next";
const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;
const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
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

const Translation = ({
  translation,
  topicName,
  peopleName,
  peopleSummary,
  title,
  duration,
  sourceImage,
  sourceUrl,
  publishDate,
  sourceOwner,
  language,
  speechSummary,
  coverUrl,
  audioLink,
}: Props) => {
  const [requestTranslation, setRequestTranslation] = useState(false);

  return (
    <div className="flex flex-col mt-15 gap-5 justify-center mx-5">
      <div className="flex flex-wrap gap-10 md:gap-20 ">
        <div className="flex flex-col gap-2 text-1xl md:max-w-1/2">
          <p className="font-semibold text-lg md:text-3xl"> {title}</p>
          <p className="font-medium">Chủ đề: {topicName}</p>
          <p className="font-medium">
            Nhân vật:{" "}
            {peopleName
              .map((string, index) => `[${index + 1}] ` + string)
              .join(", ")}
          </p>
          <p className="font-medium">
            {peopleSummary
              .map((string, index) => `[${index + 1}] ` + string)
              .join(" ")}
          </p>
          <p className="font-medium">Độ dài: {duration}</p>
          <div className="flex flex-wrap items-center gap-2 font-medium text-sm">
            <span>
              <Link href={sourceUrl} target="_blank">
                <Image
                  className="inline-block"
                  src={sourceImage}
                  alt={"srcLogo"}
                  width={40}
                  height={30}
                />
              </Link>
            </span>

            <span className="item-gradient">{sourceOwner} •</span>
            <span className="item-gradient">{publishDate} •</span>
            <span className="item-gradient">{language} </span>
          </div>
        </div>
        <div className=" flex flex-col sm:w-4/11 gap-4 items-center grow">
          <AudioPlayer
            src={audioLink}
            className="rounded-sm"
            showDownloadProgress={false}
          />
          {/*<Image*/}
          {/*  src={coverUrl}*/}
          {/*  alt="logo"*/}
          {/*  width={500}*/}
          {/*  height={100}*/}
          {/*  className="inline-block w-full rounded-lg"*/}
          {/*/>*/}
          <div className=" w-full aspect-[16/9] relative">
            <ImageKitProvider
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={authenticator}
            >
              <IKImage
                alt={title}
                path={coverUrl}
                transformation={[
                  { width: 1280, height: 720, focus: "auto" },
                  { quality: 100 },
                ]}
                width={1280}
                height={720}
                loading="lazy"
                className="  rounded-lg"
              />
            </ImageKitProvider>
          </div>
        </div>
      </div>
      <div className="font-medium">
        <p className="md:w-1/2">Tóm tắt: {speechSummary} </p>
        <button
          className="underline text-amber-500 mt-3"
          onClick={() => {
            setRequestTranslation(!requestTranslation);
          }}
        >
          {!requestTranslation ? "Xem bản dịch" : "Đóng bản dịch"}
        </button>
        {requestTranslation && (
          <div className="mt-5">
            Bản dịch:{" "}
            {translation.split("\n").map((paragraph, index) => (
              <p key={index} className="py-1">
                {paragraph}
              </p>
            ))}{" "}
            <button
              className="underline text-amber-500"
              onClick={() => {
                setRequestTranslation(!requestTranslation);
              }}
            >
              {requestTranslation && " Đóng bản dịch"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Translation;
