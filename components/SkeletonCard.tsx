// components/SkeletonCard.js
"use client"; // Required for client-side color detection
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";

export default function SkeletonCard() {
  return (
    <SkeletonTheme baseColor="#a69e88" highlightColor="#24804f">
      <div className="w-full mt-5 aspect-[1/1] overflow-hidden rounded-lg border-none backdrop-blur-xs drop-shadow-lg  bg-blue-100/30 backdrop-blur-lg rounded-lg p-3"></div>
    </SkeletonTheme>
  );
}
