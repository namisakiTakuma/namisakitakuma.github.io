import { SiteShell } from "@/components/site-shell";
import { LocaleProvider } from "@/lib/locale";

// 日本語のページ（今までどおり / から始まる URL）。英語のページは app/en/layout.tsx
export default function JaLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="ja">
      <SiteShell>{children}</SiteShell>
    </LocaleProvider>
  );
}
