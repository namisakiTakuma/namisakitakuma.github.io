export interface ProfileData {
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

// 顔写真の代わりのアイコン。本人のキャラクター（紺の猫と、頭に座る相棒のハムスター）。
// 絵はこのサイトの外で作っていて、色と線をそろえる仕組みもそちらにある。切り取り方や動きを変えたいときは、絵を作る側に頼む
// （ここでは色を変えない・絵を足さない・縦横比を変えない・回転や反転をしない）
// 静止画は、動く版の最初のコマと同じ絵（ハムスターが跳ぶ分の余白をとって、広めに切り取ってある）
export const profileIcon = "/images/profile-icon.webp";
// 同じアイコンの動く版（9秒で1周、SVG の中の SMIL と CSS で動く）
export const profileIconLoop = "/images/profile-icon-loop.svg";

export const profileDataByLocale: Record<Locale, ProfileData> = {
  ja: {
    iconAlt: "並崎 功真のアイコン（紺色の猫と、頭に座るハムスターのイラスト）",
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
    iconAlt: "Takuma Namisaki's icon, an illustration of a navy cat with a hamster sitting on its head",
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
