import {
  Award,
  Briefcase,
  Code,
  FlaskConical,
  Newspaper,
  User,
  type LucideIcon,
} from "lucide-react";

export type Locale = "ja" | "en";

// 見出し・ボタン・ラベルなど、画面の文言
export interface UiText {
  nav: Array<{ name: string; href: string; icon: LucideIcon }>;
  profileHeadline: string;
  cmiruProfile: string;
  aboutTitle: string;
  researchTitle: string;
  researchOngoing: string;
  interestsTitle: string;
  skillsTitle: string;
  careerTitle: string;
  publicationTitle: string;
  articleTitle: string;
  projectTitle: string;
  projectStatusOngoing: string;
  projectProblemLabel: string;
  projectTriggerLabel: string;
  projectFeaturesLabel: string;
  projectTechPointsLabel: string;
  projectRoleLabel: string;
  projectResultLabel: string;
  projectTechLabel: string;
  projectMore: string;
  backToProjects: string;
  projectAppPage: string;
  projectPrev: string;
  projectNext: string;
  publicationLinkFallback: string;
  articleSource: string;
  articleDate: string;
  articleHeading: string;
  articleSummary: string;
  readArticle: string;
  openMenu: string;
  closeMenu: string;
  email: { copy: string; copied: string; hint: string };
}

const nav: UiText["nav"] = [
  { name: "About", href: "/#about", icon: User },
  { name: "Research", href: "/#research", icon: FlaskConical },
  { name: "Career", href: "/#career", icon: Briefcase },
  { name: "Publications", href: "/#publications", icon: Award },
  { name: "Projects", href: "/#projects", icon: Code },
  { name: "Articles", href: "/#articles", icon: Newspaper },
];

export const uiTextByLocale: Record<Locale, UiText> = {
  ja: {
    nav,
    profileHeadline:
      "大阪公立大学 情報学研究科 修士1年\n株式会社Cmiru 共同創業者・エンジニア",
    cmiruProfile: "Cmiru Profile",
    aboutTitle: "About Me",
    researchTitle: "Research",
    researchOngoing: "研究中",
    interestsTitle: "Interests",
    skillsTitle: "Skills",
    careerTitle: "Career",
    publicationTitle: "Publications & Awards",
    articleTitle: "Articles & Blog",
    projectTitle: "Projects",
    projectStatusOngoing: "進行中",
    projectProblemLabel: "背景課題",
    projectTriggerLabel: "きっかけ",
    projectFeaturesLabel: "できること",
    projectTechPointsLabel: "技術の見どころ",
    projectRoleLabel: "担当",
    projectResultLabel: "結果",
    projectTechLabel: "使った技術",
    projectMore: "詳しく見る",
    backToProjects: "Projects 一覧に戻る",
    projectAppPage: "紹介ページ",
    projectPrev: "前のプロジェクト",
    projectNext: "次のプロジェクト",
    publicationLinkFallback: "リンク",
    articleSource: "Cmiru Blog",
    articleDate: "2025.10",
    articleHeading: "GitHub Spec-kitの内部動作から学ぶ、仕様駆動開発（SDD）",
    articleSummary:
      "GitHub CopilotのようなAIツールを活用しつつ、どのように仕様を中心においた開発サイクルを回していくかについての考察。",
    readArticle: "記事を読む",
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    email: {
      copy: "コピー",
      copied: "コピーしました",
      hint: "🐾 を @ に置き換えてください",
    },
  },
  en: {
    nav,
    profileHeadline:
      "M1, Graduate School of Informatics, Osaka Metropolitan University\nCo-founder & Engineer at Cmiru Inc.",
    cmiruProfile: "Cmiru Profile",
    aboutTitle: "About Me",
    researchTitle: "Research",
    researchOngoing: "Ongoing",
    interestsTitle: "Interests",
    skillsTitle: "Skills",
    careerTitle: "Career",
    publicationTitle: "Publications & Awards",
    articleTitle: "Articles & Blog",
    projectTitle: "Projects",
    projectStatusOngoing: "In Progress",
    projectProblemLabel: "Problem",
    projectTriggerLabel: "How It Started",
    projectFeaturesLabel: "What It Does",
    projectTechPointsLabel: "Technical Highlights",
    projectRoleLabel: "My Role",
    projectResultLabel: "Result",
    projectTechLabel: "Tech Stack",
    projectMore: "Details",
    backToProjects: "Back to Projects",
    projectAppPage: "Product page",
    projectPrev: "Previous project",
    projectNext: "Next project",
    publicationLinkFallback: "Link",
    articleSource: "Cmiru Blog",
    articleDate: "2025.10",
    articleHeading:
      "Learning Specification-Driven Development (SDD) from the Internals of GitHub Spec-kit",
    articleSummary:
      "A practical discussion on how to run a specification-centered development cycle while leveraging AI tools such as GitHub Copilot.",
    readArticle: "Read Article",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    email: {
      copy: "Copy",
      copied: "Copied",
      hint: "Replace 🐾 with @",
    },
  },
};
