// 配っているプロダクト（Chrome 拡張機能など）。/apps/ の一覧と、各プロダクトの紹介ページはここから作る。
// 紹介ページとプライバシーポリシーの URL はストアや Google の OAuth の設定に登録するので、slug は変えない

export interface AppItem {
  // URL の /apps/<slug>/ になる
  slug: string;
  name: string;
  // 一覧と紹介ページの最初に出す、1行の説明
  tagline: string;
  // 128px の正方形。名前の隣に出すので、代替テキストは付けない
  icon: string;
  // ストアで公開したら、その URL を入れる。入れると一覧と紹介ページに「入手」のリンクが出る
  storeUrl?: string;
  repositoryUrl: string;
  author: string;
  license: { name: string; url: string };
}

// プロダクトの問い合わせ先。紹介ページとプライバシーポリシーで同じものを使う。
// bot に拾われないよう、@ を含む形ではどこにも書かない（表示は components/email-link.tsx が開いたときに組み立てる）
export const appsContactEmail = {
  user: "takuma-apps",
  domain: "cmiru.com",
};

export const appsData: AppItem[] = [
  {
    slug: "chocomemo",
    name: "ちょこメモ",
    tagline:
      "すぐ書ける日本語のシンプルなメモ。Chrome の同期機能か Google ドライブで、複数の PC にメモを同期します。",
    icon: "/images/apps/chocomemo/icon128.png",
    repositoryUrl: "https://github.com/namisakiTakuma/memo-sync",
    author: "Takuma Namisaki",
    license: {
      name: "MIT",
      url: "https://github.com/namisakiTakuma/memo-sync/blob/main/LICENSE",
    },
  },
];

export function findApp(slug: string): AppItem {
  const app = appsData.find((item) => item.slug === slug);
  if (!app) throw new Error(`data/apps.ts に ${slug} がありません`);
  return app;
}
