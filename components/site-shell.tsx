"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HidingCat } from "@/components/hiding-cat";
import { MobileMenu } from "@/components/mobile-menu";
import { OpeningIntro } from "@/components/opening-intro";
import { Sidebar } from "@/components/sidebar";
import { SiteFooter } from "@/components/site-footer";
import { useLocale } from "@/lib/locale";

// どのページにも共通の枠：左の欄、本文の列、右上の猫、スマホのメニュー
export function SiteShell({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();
  const isHome = usePathname() === "/";
  // トップから入ったときだけ、最初に幕を出す（ほかのページからトップへ移ったときは出さない）
  const [showIntro, setShowIntro] = useState(isHome);
  const endIntro = useCallback(() => setShowIntro(false), []);

  return (
    <div className="min-h-screen bg-zinc-50 text-foreground font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr]">
        {/* スマホでは、トップ以外のページの左の欄を名前だけの見出しにして、本文をすぐ見せる */}
        {!isHome && (
          <header className="lg:hidden border-b border-neutral-200 px-6 py-4">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-neutral-900"
            >
              並崎 功真
            </Link>
          </header>
        )}
        <Sidebar
          className={isHome ? undefined : "hidden lg:block"}
          introShowing={showIntro}
        />

        {/* ================= メインコンテンツ (右カラム) ================= */}
        <main className="min-w-0 px-6 lg:px-12 py-12 lg:py-24 space-y-24">
          {children}
          <SiteFooter />
        </main>
      </div>

      {/* ================= 右上に隠れている猫 ================= */}
      {/* PCでは右カラムの右端にそろえる */}
      <HidingCat
        locale={locale}
        className="fixed top-0 z-30 right-[calc(max(0px,(100vw_-_72rem)_/_2)_+_1.5rem)]"
      />

      <MobileMenu />

      {showIntro && <OpeningIntro onDone={endIntro} />}
    </div>
  );
}
