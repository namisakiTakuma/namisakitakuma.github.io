import { SiteShell } from "@/components/site-shell";
import { LocaleProvider } from "@/lib/locale";

// 英語のページ（/en/ から始まる URL）。日本語のページは app/(ja)/layout.tsx
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="en">
      <SiteShell>{children}</SiteShell>
    </LocaleProvider>
  );
}
