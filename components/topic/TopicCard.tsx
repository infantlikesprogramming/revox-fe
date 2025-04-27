"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IKImage, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
const TopicCard = ({ id, topicImage, topicName }: Topic) => {
  return (
    <Link href={`/topic/${id}`}>
      <div className="flex flex-col gap-5 font-bold text-center  text-2xl">
        <div className="text-lg sm:text-2xl">
          <p>{topicName}</p>
        </div>
        <div className="min-w-44 flex justify-center">
          {/*<div className="w-60 h-60 relative overflow-hidden">*/}
          {/*  <ImageKitProvider*/}
          {/*    publicKey={publicKey}*/}
          {/*    urlEndpoint={urlEndpoint}*/}
          {/*    authenticator={authenticator}*/}
          {/*  >*/}
          {/*    <IKImage*/}
          {/*      key={topicImage} // Prevent rerender jumps*/}
          {/*      alt={topicName}*/}
          {/*      path={topicImage}*/}
          {/*      transformation={[*/}
          {/*        { width: 480, height: 480, focus: "auto" },*/}
          {/*        { quality: 80 },*/}
          {/*      ]}*/}
          {/*      loading="lazy"*/}
          {/*      className="rounded-sm"*/}
          {/*    />*/}
          {/*  </ImageKitProvider>*/}
          {/*</div>*/}
          <div className=" w-60 aspect-[1/1] relative overflow-hidden">
            <IKImage
              alt={topicName}
              path={topicImage}
              transformation={[
                { width: 480, height: 480, focus: "auto" },
                { quality: 10 },
              ]}
              loading="lazy"
              className="  rounded-lg"
              urlEndpoint={config.env.imagekit.urlEndpoint}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
