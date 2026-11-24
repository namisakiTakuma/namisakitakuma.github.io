"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { uiTextByLocale } from "@/data/ui-text";
import { useLocale } from "@/lib/locale";

// 見つからないページの中身（app/not-found.tsx から使う）。地図を広げて探している猫を出す
export function NotFoundContent() {
  const { locale } = useLocale();
  const t = uiTextByLocale[locale].notFound;

  return (
    <section className="space-y-6">
      <Image
        src="/images/cat/map.webp"
        alt={t.imageAlt}
        width={1024}
        height={689}
        className="h-auto w-64 sm:w-72"
      />
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        {t.title}
      </h1>
      <p className="text-base leading-relaxed text-neutral-700">{t.text}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.back}
      </Link>
    </section>
  );
}
