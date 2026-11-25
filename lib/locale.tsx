"use client";

import { createContext, useContext, useEffect } from "react";
import type { Locale } from "@/data/profile";

// 表示言語（JP / EN）は URL で決まる。日本語は今までどおり / から、英語は /en/ から始まる。
// 言語ごとのレイアウト（app/(ja)/layout.tsx と app/en/layout.tsx）が、ここに言語を渡す

const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  // ページの言語を html にも伝える（読み上げなどのため）。最初の表示では app/layout.tsx のスクリプトが先につけている
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export function useLocale(): { locale: Locale } {
  const locale = useContext(LocaleContext);
  if (!locale) {
    throw new Error("useLocale は LocaleProvider の中で使ってください");
  }
  return { locale };
}

// サイトの中のリンク先を、その言語の URL にする。path は / から始める（例: "/projects/picotouch", "/#about"）
export function localeHref(locale: Locale, path: string): string {
  return locale === "ja" ? path : `/en${path}`;
}

// URL の言語（/en または /en/〜 なら英語）。app/layout.tsx のスクリプトも同じ見方をしている
export function localeOfPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ja";
}

// 今のページの、言語を除いた場所（/en/projects/picotouch → /projects/picotouch）
export function stripLocale(pathname: string): string {
  if (localeOfPath(pathname) === "ja") return pathname;
  return pathname.slice(3) || "/";
}
