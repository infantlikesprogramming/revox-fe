import React from "react";
import Link from "next/link";
import Image from "next/image";

const AdminHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-5 justify-between w-full text-black ">
      <div className="flex flex-col gap-3 max-w-50 grow">
        <Link href="/user/admin">
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/icons/revox-lg.png"
              alt="logo"
              width={60}
              height={60}
            />
            <p className="text-2xl font-konkhmer-sleokchher text-[#0D3F00]">
              Revox
            </p>
          </div>
        </Link>
      </div>
      <div className=" min-w-40 max-w-120 text-right pr-10  flex flex-col justify-center">
        <p className="font-semibold text-xl">Xin chào đội trưởng</p>
        <p className="text-[#64748B] text-sm ">
          Hãy chia sẻ nguồn dẫn của tri thức ở đây
        </p>
      </div>
    </div>
  );
};
export default AdminHeader;
