export interface ProfileData {
  tagline: string;
  // アイコン（profileIcon）の代替テキスト
  iconAlt: string;
  about: string;
  interests: string[];
  skills: string[];
}

export type Locale = "ja" | "en";

// 連絡先のメールアドレス。bot に拾われないよう、@ を含む形ではどこにも書かない
// （表示は components/email-contact.tsx が肉球に置き換え、コピー時だけ組み立てる）
export const contactEmail = {
  user: "taku1899neko",
  domain: "gmail.com",
};

// 顔写真の代わりのアイコン。本人が描いた、ペンを持った猫のイラストの顔のあたりを切り抜いたもの
export const profileIcon = "/images/profile-icon.webp";

export const profileDataByLocale: Record<Locale, ProfileData> = {
  ja: {
    tagline: "いつも考えています。",
    iconAlt: "並崎 功真のアイコン（ペンを持った猫のイラスト）",
    about: `私は考えることが好きです。
どうすればもっと面白くできるのか。どうすればもっと伝わりやすくなるのか。どうすればもっと皆の負担が減るのか。ふとしたときにも考えてしまいます。
「もっとよくできる」に気づき、考え抜き、動いて、形になるまでもっていく。それが私の強みです。
私の特性としては、よく食べ、よく遊び、よく夜更かしをします。
弱点は、猫が好きなのに猫アレルギーなところです。`,
    interests: ["旅行", "登山", "ゲーム", "映画", "アニメ", "パズル", "筋トレ", "猫"],
    skills: [
      "自然言語処理",
      "UI/UX",
      "Web Development",
      "Software Engineering",
      "React",
      "TypeScript",
      "Python",
    ],
  },
  en: {
    tagline: "Always thinking.",
    iconAlt: "Takuma Namisaki's icon, an illustrated cat holding a pen",
    about: `I love to think.
How can this be more fun? How can it be easier to understand? How can it take more of the burden off everyone? I find myself thinking about these questions even in idle moments.
Noticing where things could be better, thinking them through, taking action, and carrying them all the way to a finished result: that is my strength.
As for my traits, I eat well, play hard, and often stay up late.
My weakness: I love cats, but I am allergic to them.`,
    interests: ["Travel", "Hiking", "Games", "Movies", "Anime", "Puzzles", "Working out", "Cats"],
    skills: [
      "Natural Language Processing",
      "UI/UX",
      "Web Development",
      "Software Engineering",
      "React",
      "TypeScript",
      "Python",
    ],
  },
};
