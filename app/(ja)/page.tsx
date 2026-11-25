import type { Metadata } from "next";
import { HomeSections } from "@/components/home-sections";
import { languageAlternates } from "@/lib/page-metadata";

// トップページ（日本語）。英語は app/en/page.tsx
export const metadata: Metadata = {
  alternates: languageAlternates("ja", "/"),
};

export default function Home() {
  return <HomeSections />;
}
