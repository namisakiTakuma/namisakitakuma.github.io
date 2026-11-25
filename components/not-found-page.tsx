"use client";

import { useSyncExternalStore } from "react";
import { NotFoundContent } from "@/components/not-found-content";
import { SiteShell } from "@/components/site-shell";
import type { Locale } from "@/data/profile";
import { LocaleProvider, localeOfPath } from "@/lib/locale";

// 見つからないページの枠。404.html は日本語と英語で1つなので、書き出すときは日本語で作り、
// ブラウザで開いた URL が /en/〜 なら英語に替える（描き始めは書き出したものに合わせ、すぐ替える）
const subscribe = () => () => {};

export function NotFoundPage() {
  const locale = useSyncExternalStore<Locale>(
    subscribe,
    () => localeOfPath(window.location.pathname),
    () => "ja",
  );

  return (
    <LocaleProvider locale={locale}>
      <SiteShell>
        <NotFoundContent />
      </SiteShell>
    </LocaleProvider>
  );
}
