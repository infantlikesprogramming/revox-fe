import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface Props {
  role?: string;
}
const Footer = ({ role }: Props) => {
  return (
    <div>
      <footer
        className={cn(
          "text-white mt-10",
          role === "admin" ? "text-black" : "text-white",
        )}
      >
        <hr
          className={cn(
            "mt-10",
            role === "admin" && "border border-0.2 border-gray-400/50",
          )}
        />

        <div className="max-w-6xl mx-auto px-4">
          <div className="mt-10 justify-center items-center gap-7 sm:gap-24 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-wrap">
            <Image
              src={
                role === "admin"
                  ? "/icons/revox-sketch-2.svg"
                  : "/icons/revox-sketch.svg"
              }
              width={140}
              height={20}
              alt="revox sketch"
              className="opacity-90"
            />
            <ul className="flex flex-col gap-1 space-x-4 justify-center text-sm">
              <li>
                <a href="/" className="hover:text-white">
                  Home/Trang chủ
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white">
                  About/Giới thiệu
                </a>
              </li>
              <li>
                <a href="/donate" className="hover:text-white">
                  Donate/Quyên góp
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact/Liên Hệ
                </a>
              </li>
              <li>
                <a href="/user/admin" className="hover:text-white">
                  Admin/Quản lý
                </a>
              </li>
            </ul>
          </div>
          {/* Copyright */}
          <div className="mt-8 text-center  text-sm">
            <p>© 2025 Revox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
