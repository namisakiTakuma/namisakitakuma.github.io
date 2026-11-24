"use client";

import { ExternalLink, Newspaper } from "lucide-react";
import { RevealSection } from "@/components/sections/reveal-section";
import { Card, CardContent } from "@/components/ui/card";
import { uiTextByLocale } from "@/data/ui-text";
import { useLocale } from "@/lib/locale";

// ========== Articles セクション ==========
export function ArticlesSection() {
  const { locale } = useLocale();
  const t = uiTextByLocale[locale];

  return (
    <RevealSection id="articles">
      <h2 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-200 pb-2 inline-block">
        {t.articleTitle}
      </h2>
      <div className="space-y-4">
        <Card className="hover:border-neutral-300 transition-colors shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center text-xs text-blue-600 font-mono">
                <Newspaper className="w-3.5 h-3.5 mr-1" />
                {t.articleSource}
              </div>
              <span className="text-xs text-neutral-500 font-mono">
                {t.articleDate}
              </span>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 leading-snug">
              {t.articleHeading}
            </h3>
            <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
              {t.articleSummary}
            </p>
            <div className="mt-4">
              <a
                href="https://cmiru.com/corporate/blog/b85328ba-7223-4fa3-a59a-4e3ca7cbb6fe"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm text-neutral-500 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-1" /> {t.readArticle}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </RevealSection>
  );
}
