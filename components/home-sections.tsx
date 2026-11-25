import { AboutSection } from "@/components/sections/about-section";
import { ArticlesSection } from "@/components/sections/articles-section";
import { CareerSection } from "@/components/sections/career-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { PublicationsSection } from "@/components/sections/publications-section";
import { ResearchSection } from "@/components/sections/research-section";

// トップページの中身。日本語（app/(ja)/page.tsx）と英語（app/en/page.tsx）で同じものを使い、言葉はレイアウトが渡す言語で替わる。
// 左の欄・メニューなどの共通部分は components/site-shell.tsx
export function HomeSections() {
  return (
    <>
      <AboutSection />
      <ResearchSection />
      <CareerSection />
      <PublicationsSection />
      <ProjectsSection />
      <ArticlesSection />
    </>
  );
}
