import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";

// 無い URL を開いたときのページ。静的に書き出すと 404.html になり、GitHub Pages がこれを返す
export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return <NotFoundContent />;
}
