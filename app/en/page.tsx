import type { Metadata } from "next";
import { HomeSections } from "@/components/home-sections";
import { languageAlternates } from "@/lib/page-metadata";

// トップページ（英語、/en/）。日本語は app/(ja)/page.tsx
export const metadata: Metadata = {
  alternates: languageAlternates("en", "/"),
};

export default function Home() {
  return <HomeSections />;
}
