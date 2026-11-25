import type { Metadata } from "next";
import { ProjectDetail } from "@/components/project-detail";
import { projectMetadata, projectStaticParams } from "@/lib/page-metadata";

// プロジェクトの詳細ページ（日本語）。英語は app/en/projects/[id]/page.tsx
export const dynamicParams = false;

export function generateStaticParams() {
  return projectStaticParams();
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  return projectMetadata("ja", id);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return <ProjectDetail id={id} />;
}
