import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
export const dynamic = "force-dynamic"; // Disable caching

const josefinSans = localFont({
  src: [
    {
      path: "/fonts/JosefinSans-Bold.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--josefin-sans",
});

const konkhmerSleokchher = localFont({
  src: [
    {
      path: "/fonts/KonkhmerSleokchher-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--konkhmer-sleokchher",
});

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata = {
  title: "Revox",
  description: "Vượt rào ngôn ngữ, khai tri thức",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} ${josefinSans.variable} ${konkhmerSleokchher.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
