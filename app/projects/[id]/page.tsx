import type { Metadata } from "next";
import { ProjectDetail } from "@/components/project-detail";
import { hasDetail, projectsDataByLocale } from "@/data/projects";

// 静的に書き出すので、詳細ページはプロジェクトの数だけ前もって作る（外のページを直接開くものは作らない）
export const dynamicParams = false;

const projects = projectsDataByLocale.ja.filter(hasDetail);

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return <ProjectDetail id={id} />;
}
