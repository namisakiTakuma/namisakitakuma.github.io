"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { MarkedText } from "@/components/marked-text";
import { ProjectHighlight } from "@/components/project-highlight";
import { Badge } from "@/components/ui/badge";
import { projectsDataByLocale } from "@/data/projects";
import { uiTextByLocale } from "@/data/ui-text";
import { useLocale } from "@/lib/locale";

// プロジェクトの詳細ページの中身（app/projects/[id]/page.tsx から使う）
export function ProjectDetail({ id }: { id: string }) {
  const { locale } = useLocale();
  const t = uiTextByLocale[locale];
  const projects = projectsDataByLocale[locale];
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return null;

  const project = projects[index];
  const prev = projects[index - 1];
  const next = projects[index + 1];

  // 始まり → できること → 技術の見どころ → 担当 → 結果 の順に並べ、中身の無い項目は出さない。
  // 始まりの見出しは、課題からなら「背景課題」、人の声からなら「きっかけ」
  const details: {
    label: string;
    text?: string;
    items?: { label: string; text: string }[];
  }[] = [
    {
      label:
        project.originKind === "problem"
          ? t.projectProblemLabel
          : t.projectTriggerLabel,
      text: project.origin,
    },
    { label: t.projectFeaturesLabel, items: project.features },
    { label: t.projectTechPointsLabel, items: project.techPoints },
    { label: t.projectRoleLabel, text: project.role },
    { label: t.projectResultLabel, text: project.result },
  ].filter((detail) => detail.text || detail.items?.length);

  return (
    <motion.article
      data-cat-topic={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <Link
        href={`/#project-${project.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.backToProjects}
      </Link>

      <header className="space-y-4">
        <p className="text-sm text-neutral-500">{project.category}</p>
        <h1 className="flex flex-wrap items-center gap-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl [word-break:auto-phrase]">
          <span>{project.title}</span>
          {project.status === "ongoing" && (
            <Badge variant="secondary">{t.projectStatusOngoing}</Badge>
          )}
        </h1>
        <p className="text-base text-neutral-700 leading-relaxed">
          {project.summary}
        </p>
        {project.highlight && (
          <ProjectHighlight text={project.highlight} className="text-base" />
        )}
        {(project.app || project.url) && (
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {project.app && (
              <Link
                href={`/apps/${project.app}`}
                className="inline-flex w-fit items-center gap-1 text-sm font-medium text-neutral-700 hover:text-neutral-900 underline-offset-4 hover:underline"
              >
                {t.projectAppPage}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 underline-offset-4 hover:underline"
              >
                {project.url.replace(/^https?:\/\//, "")}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </header>

      <div className="space-y-8 border-t border-neutral-200 pt-8">
        {details.map(({ label, text, items }, i) => (
          <section
            key={label}
            className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6"
          >
            <h2 className="flex items-baseline gap-2 text-sm font-semibold text-neutral-900">
              <span className="font-mono text-xs text-neutral-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
            </h2>
            {items ? (
              <dl className="space-y-4">
                {items.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <dt className="text-[15px] font-semibold text-neutral-900">
                      {item.label}
                    </dt>
                    <dd className="text-[15px] text-neutral-700 leading-relaxed">
                      <MarkedText text={item.text} />
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-[15px] text-neutral-700 leading-relaxed">
                <MarkedText text={text ?? ""} />
              </p>
            )}
          </section>
        ))}
        <section className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <h2 className="text-sm font-semibold text-neutral-900">
            {t.projectTechLabel}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </section>
      </div>

      {/* 前後のプロジェクトへ */}
      <nav className="grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 text-sm">
        {prev && (
          <Link
            href={`/projects/${prev.id}`}
            className="group flex flex-col gap-1 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <span className="inline-flex items-center gap-1 text-xs">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              {t.projectPrev}
            </span>
            <span className="font-medium text-neutral-800 [word-break:auto-phrase]">
              {prev.title}
            </span>
          </Link>
        )}
        {next && (
          <Link
            href={`/projects/${next.id}`}
            className="group col-start-2 flex flex-col items-end gap-1 text-right text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <span className="inline-flex items-center gap-1 text-xs">
              {t.projectNext}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="font-medium text-neutral-800 [word-break:auto-phrase]">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </motion.article>
  );
}
