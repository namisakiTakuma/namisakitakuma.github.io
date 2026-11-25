import type { Metadata } from "next";
import type { Locale } from "@/data/profile";
import { hasDetail, projectsDataByLocale } from "@/data/projects";

// ページの言語ごとの設定（サーバーで使う。lib/locale.tsx はブラウザで動く部品なので、ここからは使わない）

// 日本語と英語の同じページを、互いに知らせる（検索サイト向け）。path は言語を除いた URL で、末尾に / を付ける
export function languageAlternates(
  locale: Locale,
  path: string,
): Metadata["alternates"] {
  return {
    canonical: locale === "ja" ? path : `/en${path}`,
    languages: { ja: path, en: `/en${path}`, "x-default": path },
  };
}

// 詳細ページは、プロジェクトの数だけ前もって作る（外のページを直接開くものは作らない）。日本語と英語で同じ id
export function projectStaticParams() {
  return projectsDataByLocale.ja
    .filter(hasDetail)
    .map((project) => ({ id: project.id }));
}

export function projectMetadata(locale: Locale, id: string): Metadata {
  const project = projectsDataByLocale[locale]
    .filter(hasDetail)
    .find((p) => p.id === id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: languageAlternates(locale, `/projects/${id}/`),
  };
}
