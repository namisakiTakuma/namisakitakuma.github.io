import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appsData } from "@/data/apps";

// 配っているプロダクトの一覧。中身は data/apps.ts から作る。本文は日本語だけ（英語に切り替えても日本語のまま）
export const metadata: Metadata = {
  title: "プロダクト",
  description: "Takuma Namisaki が作っているプロダクトの一覧",
};

export default function AppsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          プロダクト
        </h1>
        <p className="text-[15px] leading-relaxed text-neutral-700">
          作っているアプリの紹介ページです。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {appsData.map((app) => (
          <Link
            key={app.slug}
            href={`/apps/${app.slug}`}
            className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            <Card className="flex h-full flex-col transition-all group-hover:-translate-y-0.5 group-hover:border-neutral-300 group-hover:shadow-md">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <Image src={app.icon} alt="" width={56} height={56} className="h-14 w-14 shrink-0" />
                <CardTitle className="flex flex-wrap items-center gap-2 text-lg leading-snug">
                  <span>{app.name}</span>
                  {!app.storeUrl && <Badge variant="secondary">公開準備中</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm leading-relaxed text-neutral-600">{app.tagline}</p>
                <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900">
                  詳しく見る
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
