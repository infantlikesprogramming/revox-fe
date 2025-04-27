import React from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/Search";
import CustomNavbar from "@/components/CustomNavbar";
import { db } from "@/database/drizzle";
import { people, topics } from "@/database/schema";

const Header = async () => {
  const topicLists = await db.select().from(topics).limit(10);
  const peopleLists = await db.select().from(people).limit(10);

  return (
    <div className="flex flex-wrap gap-5 justify-center w-full ">
      <div className="flex flex-col justify-center gap-3 max-w-50 grow ">
        <Link href="/">
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/icons/revox-lg.png"
              alt="logo"
              width={60}
              height={60}
            />
            <p className="text-2xl font-konkhmer-sleokchher text-logo-title">
              Revox
            </p>
          </div>
        </Link>
        <p className="font-medium text-white text-[16px] pl-1 w-full  text-center">
          Vượt rào ngôn ngữ, <br /> khai tri thức
        </p>
      </div>
      <div className=" min-w-40 max-w-160 grow ">
        <Search />
      </div>
      <div className=" min-w-40  grow max-w-120 ">
        <CustomNavbar topics={topicLists} people={peopleLists} />
      </div>
    </div>
  );
};
export default Header;
