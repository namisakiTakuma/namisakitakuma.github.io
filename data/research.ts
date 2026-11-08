export interface ResearchItem {
  id: string;
  stage: string; // 修士 / 学部
  title: string;
  description?: string;
  // 発表や掲載などの成果。==…== で囲むと蛍光ペンが引かれる
  outcomes?: Array<{ text: string; link?: string; linkText?: string }>;
  current?: boolean;
}

export interface ResearchData {
  items: ResearchItem[];
}

export type Locale = "ja" | "en";

// 新しい順に並べる
export const researchDataByLocale: Record<Locale, ResearchData> = {
  ja: {
    items: [
      {
        id: "master",
        stage: "修士",
        title: "生成文書による小規模言語モデルの組み合わせ",
        description:
          "複数の小規模言語モデルを、生成した文書を介して組み合わせる方法を研究しています。",
        outcomes: [
          {
            text: "国際会議 AROB 2027 に投稿中",
            link: "https://isarob.org/symposium/",
            linkText: "学会",
          },
        ],
        current: true,
      },
      {
        id: "undergrad",
        stage: "学部",
        title: "LLMの多段階推論能力の向上手法について",
        outcomes: [
          { text: "国際会議 ICICIC2025 で論文発表" },
          {
            text: "==論文誌 ICIC Express Letters に掲載==",
            link: "https://doi.org/10.24507/icicel.20.10.1103",
            linkText: "論文",
          },
        ],
      },
    ],
  },
  en: {
    items: [
      {
        id: "master",
        stage: "Master's",
        title: "Combining small language models through generated documents",
        description:
          "Studying how to combine several small language models through the documents they generate.",
        outcomes: [
          {
            text: "Submitted to AROB 2027 (international symposium)",
            link: "https://isarob.org/symposium/",
            linkText: "Symposium",
          },
        ],
        current: true,
      },
      {
        id: "undergrad",
        stage: "Undergraduate",
        title: "Methods for improving multi-step reasoning in LLMs",
        outcomes: [
          { text: "Presented a paper at ICICIC2025 (international conference)" },
          {
            text: "==Published in ICIC Express Letters (journal)==",
            link: "https://doi.org/10.24507/icicel.20.10.1103",
            linkText: "Paper",
          },
        ],
      },
    ],
  },
};
