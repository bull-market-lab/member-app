import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { Metadata } from "next";
import { getBaseUrl } from "@/src/utils/urls";
import Providers from "@/src/app/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Next.js Discord Forum",
    template: "%s | Next.js Discord Forum",
  },
  description: "The web version of the Next.js Discord server",
  alternates: {
    canonical: getBaseUrl(),
  },
  openGraph: {
    title: {
      default: "Next.js Discord Forum",
      template: "%s | Next.js Discord Forum",
    },
    description: "The web version of the Next.js Discord server",
    type: "website",
    url: getBaseUrl(),
    siteName: "Next.js Discord Forum",
  },
  twitter: {
    card: "summary",
    title: "Next.js Discord Forum",
    description: "The web version of the Next.js Discord server",
  },
};

type RootLayoutProps = { children: ReactNode };

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body className="bg-neutral-50 dark:bg-neutral-900 text-slate-900 dark:text-white">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
