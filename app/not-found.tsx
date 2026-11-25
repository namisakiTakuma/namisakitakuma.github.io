import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found-page";

// 無い URL を開いたときのページ。静的に書き出すと 404.html になり、GitHub Pages がこれを返す。
// 日本語と英語で1つだけなので、言語は開いた URL を見てブラウザで決める（components/not-found-page.tsx）
export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return <NotFoundPage />;
}
