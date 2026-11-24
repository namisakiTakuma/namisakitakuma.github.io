"use client";

import { Fragment } from "react";
import { ExternalLink } from "lucide-react";
import { RevealSection } from "@/components/sections/reveal-section";
import { Card, CardContent } from "@/components/ui/card";
import {
  getPublicationIcon,
  getPublicationTypeLabel,
  publicationsDataByLocale,
  selfAuthorName,
} from "@/data/publications";
import { uiTextByLocale } from "@/data/ui-text";
import { useLocale } from "@/lib/locale";

// ========== Publications & Awards セクション ==========
export function PublicationsSection() {
  const { locale } = useLocale();
  const t = uiTextByLocale[locale];
  const publicationsData = publicationsDataByLocale[locale];

  return (
    <RevealSection id="publications">
      <h2 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-200 pb-2 inline-block">
        {t.publicationTitle}
      </h2>
      <div className="space-y-4">
        {publicationsData.map((pub) => {
          const Icon = getPublicationIcon(pub.type);
          const typeLabel = getPublicationTypeLabel(pub.type, locale);

          return (
            <Card
              key={pub.id}
              className="hover:border-neutral-300 transition-colors shadow-sm"
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center text-xs text-blue-600 font-mono">
                    <Icon className="w-3.5 h-3.5 mr-1" />
                    {typeLabel}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    {pub.year}
                    {pub.month
                      ? `.${pub.month.toString().padStart(2, "0")}`
                      : ""}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 leading-snug">
                  {pub.title}
                </h3>
                {pub.paperTitle && (
                  <p className="text-sm text-neutral-700 mt-2">
                    “{pub.paperTitle}”
                  </p>
                )}
                {pub.authors && (
                  <p className="text-sm text-neutral-600 mt-2">
                    {pub.authors.map((author, i) => (
                      <Fragment key={author}>
                        {i > 0 && ", "}
                        {author === selfAuthorName ? (
                          <strong className="font-semibold text-neutral-900">
                            {author}
                          </strong>
                        ) : (
                          author
                        )}
                      </Fragment>
                    ))}
                  </p>
                )}
                {pub.venue && (
                  <p className="text-sm text-neutral-500 mt-1 text-balance">
                    {pub.venue}
                  </p>
                )}
                {pub.description && (
                  <p className="text-sm text-neutral-600 mt-2">
                    {pub.description}
                  </p>
                )}
                {pub.link && (
                  <div className="mt-4">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-sm text-neutral-500 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />{" "}
                      {pub.linkText || t.publicationLinkFallback}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </RevealSection>
  );
}
