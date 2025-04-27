import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { after } from "next/server";
import Header from "@/components/Header";
import SkeletonCard from "@/components/SkeletonCard";
import { Suspense } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="root-container flex flex-col items-center bg-[#431504]">
      <div className="max-w-7xl py-10  mx-5 w-full">
        <Header />
        <Suspense fallback={<SkeletonCard />}>
          <div className="grow">{children}</div>
        </Suspense>
      </div>
    </main>
  );
};

export default Layout;
