"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Database } from "lucide-react";
import { ProjectHighlight } from "@/components/project-highlight";
import { RevealSection } from "@/components/sections/reveal-section";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projectsDataByLocale } from "@/data/projects";
import { uiTextByLocale } from "@/data/ui-text";
import { useLocale } from "@/lib/locale";

// ========== Projects セクション ==========
// 一覧では要点だけを見せ、カードを押すと詳細ページ（app/projects/[id]）へ移る
export function ProjectsSection() {
  const { locale } = useLocale();
  const t = uiTextByLocale[locale];
  const projectsData = projectsDataByLocale[locale];

  return (
    <RevealSection id="projects">
      <h2 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-200 pb-2 inline-block">
        {t.projectTitle}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {projectsData.map((project) => (
          <Link
            key={project.id}
            // 詳細ページの「一覧に戻る」で、このカードの位置に戻ってくる
            id={`project-${project.id}`}
            href={`/projects/${project.id}`}
            data-cat-topic={project.id}
            className="group scroll-mt-24 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            <Card className="flex h-full flex-col overflow-hidden transition-all group-hover:-translate-y-0.5 group-hover:border-neutral-300 group-hover:shadow-md">
              {/* 画像は 1200:630 にそろえてある。画像のないプロジェクトは、薄いアイコンだけの枠にする */}
              <div className="relative aspect-[40/21] overflow-hidden border-b border-neutral-200 bg-neutral-100">
                {project.image ? (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Database
                      className="h-10 w-10 text-neutral-300"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
              </div>
              <CardHeader className="space-y-2">
                <CardDescription className="text-xs">
                  {project.category}
                </CardDescription>
                <CardTitle className="flex flex-wrap items-center gap-2 text-lg leading-snug text-neutral-900 [word-break:auto-phrase]">
                  <span>{project.title}</span>
                  {project.status === "ongoing" && (
                    <Badge variant="secondary">{t.projectStatusOngoing}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {project.summary}
                </p>
                {project.highlight && (
                  <ProjectHighlight text={project.highlight} />
                )}
              </CardContent>
              <CardFooter className="flex flex-wrap items-end justify-between gap-3 pb-6">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors">
                  {t.projectMore}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </RevealSection>
  );
}
