"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IKImage, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";

type Props = Omit<Person, "shortSummary" | "speechesId">;
const PersonCard = ({
  id,
  personName,
  org,
  personImage,
  longSummary,
}: Props) => {
  const pathname = usePathname();
  return (
    // I dont know why but if we just do flex-wrap with no other conditions, it will always wrap with the summary paragraph there
    <div className="flex max-sm:flex-wrap gap-5 md:gap-10">
      <div className="min-w-44 max-sm:flex justify-center">
        <div className=" w-45 aspect-[1/1] relative">
          <IKImage
            alt={personName}
            path={personImage}
            transformation={[
              { width: 480, height: 480, focus: "auto" },
              { quality: 100 },
            ]}
            loading="lazy"
            className="  rounded-lg"
            urlEndpoint={config.env.imagekit.urlEndpoint}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 grow ">
        <div className="flex flex-wrap justify-between font-bold font-josefin-sans">
          <p className=" w-60">{personName}</p>{" "}
          <p className="w-30 sm:w-50 sm:text-right sm:pr-2">{org}</p>
        </div>
        <p className="w-full">{longSummary}</p>
        <div>
          <Link href={`/person/${id}`}>
            {pathname === "/person" && (
              <p className="text-sm text-[#00FBFF] font-semibold">
                Các bài nói chuyện
              </p>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PersonCard;
