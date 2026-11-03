# Takuma Namisaki Portfolio

Takuma Namisaki のポートフォリオサイトです。

https://namisakitakuma.github.io

## 掲載内容

- **About**: プロフィール、興味のある分野、スキル
- **Career**: 経歴
- **Publications**: 論文・発表・受賞
- **Articles & Blog**: 記事・ブログ
- **Projects**: 開発・企画に関わったプロダクト

日本語と英語の表示を切り替えられます。

## 使用技術

- Next.js（App Router、静的エクスポート）
- TypeScript
- Tailwind CSS
- Framer Motion
- GitHub Actions / GitHub Pages

## 構成

```text
app/          画面（page.tsx）とレイアウト
components/   UIコンポーネント（Card、Badge）
data/         掲載内容（日本語・英語）
  profile.ts       プロフィール
  career.ts        経歴
  publications.ts  論文・発表・受賞
  projects.ts      プロジェクト
```

掲載内容は `data/` のファイルを編集するだけで更新できます。

## ローカルで動かす

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## デプロイ

`main` ブランチへのpushで、GitHub Actionsがビルドし、GitHub Pagesへ公開します。
