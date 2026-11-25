"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { uiTextByLocale } from "@/data/ui-text";
import { LocaleSwitch } from "@/components/locale-switch";
import { localeHref, useLocale } from "@/lib/locale";

// ================= モバイル向け フローティング・ハンバーガーメニュー =================
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useLocale();
  const t = uiTextByLocale[locale];

  // メニューが開いているときは背面のスクロールを無効化。言語を切り替えるとメニューごと作り直されるので、
  // 閉じずに消えたときも元に戻す
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-3 bg-neutral-900 text-white rounded-full shadow-lg hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
        aria-label={t.openMenu}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* メニューオーバーレイ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-sm"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors focus:outline-none bg-neutral-100 rounded-full"
                  aria-label={t.closeMenu}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <LocaleSwitch variant="menu" />

              <nav className="flex flex-col items-center justify-center flex-1 gap-8">
                {t.nav.map((link) => (
                  <Link
                    key={link.name}
                    href={localeHref(locale, link.href)}
                    onClick={() => setIsOpen(false)}
                    className="group flex flex-col items-center text-xl font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="w-6 h-6" />
                      {link.name}
                    </div>
                    <span className="h-0.5 w-0 bg-neutral-900 group-hover:w-full transition-all duration-300 mt-2"></span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
