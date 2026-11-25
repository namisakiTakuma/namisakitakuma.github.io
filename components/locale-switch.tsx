"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/data/profile";
import { localeHref, stripLocale, useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

// JP / EN の切り替え。押すと、同じページのもう片方の言語の URL へ移る（/ ⇔ /en/、/projects/〜 ⇔ /en/projects/〜）。
// トップでは、いま見ている項目（#projects など）も引き継ぐ

const LOCALES: { locale: Locale; label: string }[] = [
  { locale: "ja", label: "JP" },
  { locale: "en", label: "EN" },
];

// トップで、いま画面の上の方にある項目。いちばん上にいるときは引き継がない
function currentSectionId(): string | null {
  if (window.scrollY < 10) return null;
  let id: string | null = null;
  document.querySelectorAll<HTMLElement>("main section[id]").forEach((s) => {
    if (s.getBoundingClientRect().top <= window.innerHeight / 3) id = s.id;
  });
  return id;
}

export function LocaleSwitch({ variant }: { variant: "sidebar" | "menu" }) {
  const { locale } = useLocale();
  const router = useRouter();
  const path = stripLocale(usePathname());

  const itemClassName = (active: boolean) =>
    variant === "sidebar"
      ? cn(
          "px-3 py-1.5 text-xs font-semibold rounded",
          active
            ? "bg-neutral-900 text-white"
            : "text-neutral-600 hover:text-neutral-900",
        )
      : cn(
          "px-3 py-1.5 text-xs font-semibold rounded border",
          active
            ? "bg-neutral-900 text-white border-neutral-900"
            : "border-neutral-300 text-neutral-600",
        );

  return (
    <div
      className={
        variant === "sidebar"
          ? "mt-4 inline-flex rounded-md border border-neutral-200 p-1 bg-white"
          : "flex justify-center gap-2 pt-6"
      }
    >
      {LOCALES.map((item) => {
        if (item.locale === locale) {
          return (
            <span
              key={item.locale}
              aria-current="true"
              className={itemClassName(true)}
            >
              {item.label}
            </span>
          );
        }
        const href = localeHref(item.locale, path);
        return (
          <Link
            key={item.locale}
            href={href}
            hrefLang={item.locale}
            lang={item.locale}
            className={itemClassName(false)}
            onClick={(e) => {
              const id = path === "/" ? currentSectionId() : null;
              if (!id) return;
              e.preventDefault();
              router.push(`${href}#${id}`);
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
