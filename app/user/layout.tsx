import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { after } from "next/server";
import SkeletonCard from "@/components/SkeletonCard";
import { Suspense } from "react";
import AdminHeader from "@/components/user/admin/AdminHeader";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className=" flex flex-col items-center bg-yellow-50">
      <div className="max-w-7xl py-10  mx-5 w-full">
        <AdminHeader />
        <Suspense fallback={<SkeletonCard />}>
          <div className="grow">{children}</div>
        </Suspense>
      </div>
    </main>
  );
};

export default Layout;
