import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { EmailLink } from "@/components/email-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appsContactEmail, findApp } from "@/data/apps";

// ちょこメモの紹介ページ。Chrome ウェブストアの掲載ページと Google の OAuth 同意画面に、この URL を登録する。
// Google のブランドの確認のため、ログインなしで開けること、何をするかの説明、プライバシーポリシーへのリンク、
// 同意画面と同じ名前「ちょこメモ」が要る。中身は memo-sync の README から作り、README とポリシーに無いことは書かない
const app = findApp("chocomemo");

export const metadata: Metadata = {
  title: app.name,
  description: app.tagline,
};

const features = [
  {
    label: "書く",
    text: "番号のタブでメモを切り替えます。書いたそばから保存します。日時や、表示中のページのタイトルと URL をボタンで入れられます。右クリックで、選んだ文字をメモに送れます。サイドパネルでも開けます。",
  },
  {
    label: "Markdown",
    text: "書式を付けて表示に切り替えると、見出しや表が整った見た目のまま書けます。「#」や「**」の記号は、カーソルのある所だけに出ます。チェックボックスは押すだけで入れ替わり、箇条書きは Enter で次の行にも続きます。行の頭で「/」を打つと、表・見出し・チェックボックスなどを選んで入れられます。「書式付きでコピー」で、Slack・Google ドキュメント・Gmail に貼っても書式が残ります。",
  },
  {
    label: "探す・置換",
    text: "すべてのメモから探して、置換できます。大文字と小文字、全角と半角、ひらがなとカタカナは区別しません。置換の直後は「元に戻す」で戻せます。",
  },
  {
    label: "画像",
    text: "貼り付けとドラッグで画像を足せます。四角・矢印・文字で印を付けられます。書いている場所に「[画像 1]」の印が入ります。",
  },
  {
    label: "AI に渡す",
    text: "「コピー」で、文章と画像の保存場所をまとめてコピーします。Claude Code などのコーディング AI にそのまま貼れます。",
  },
  {
    label: "整理",
    text: "グループで絞り込めます。メモのタブもグループも、ドラッグで並べ替えられます。削除したメモと画像は、ゴミ箱から 30 日間戻せます。テキストや ZIP で書き出し・取り込みができます。",
  },
  {
    label: "守る",
    text: "パスワード・API キー・個人情報らしい文字を見つけて知らせます。コピーの前に、見つけた文字を伏せられます。メモを隠して、画面に出さないこともできます。隠すのは画面だけで、暗号化はしません。",
  },
];

const syncMethods = [
  {
    name: "Chrome の同期機能",
    rows: [
      ["準備", "各 PC で Chrome にログインし、同期をオンにする"],
      ["容量", "合計 100KB。日本語でおよそ 3 万字"],
      ["画像", "貼れない"],
    ],
  },
  {
    name: "Google ドライブ",
    rows: [
      ["準備", "設定画面で Google アカウントにログインする"],
      ["容量", "気にしなくてよい"],
      ["画像", "貼れる"],
    ],
  },
];

const dataPoints = [
  "メモは、利用者の PC と、利用者の Google アカウントの中だけに置きます。開発者のサーバーにメモを送ることはありません。",
  "広告と、利用状況の計測はありません。",
  "パスワードや個人情報らしい文字を調べるのは、PC の中だけです。",
  "外のサーバーからスクリプトを読み込むことはありません。",
];

const linkClass = "text-chocomemo-ink underline underline-offset-4 hover:text-neutral-900";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2.5 text-lg font-semibold text-neutral-900">
        <span aria-hidden="true" className="h-4 w-1 rounded-full bg-chocomemo" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ChocomemoPage() {
  return (
    <article className="space-y-12">
      <Link
        href="/apps"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" />
        プロダクト一覧
      </Link>

      <header className="space-y-4">
        <div className="flex items-center gap-4">
          <Image src={app.icon} alt="" width={72} height={72} className="h-[72px] w-[72px] shrink-0" priority />
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{app.name}</h1>
        </div>
        <p className="text-base leading-relaxed text-neutral-700">{app.tagline}</p>
      </header>

      <Section title="できること">
        <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
          {features.map((feature) => (
            <div key={feature.label} className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="text-sm font-semibold text-chocomemo-ink">{feature.label}</dt>
              <dd className="text-[15px] leading-relaxed text-neutral-700">{feature.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="同期の方式">
        <p className="text-[15px] leading-relaxed text-neutral-700">
          設定画面で、次の 2 つから選びます。すべての PC で同じ方式を選んでください。
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {syncMethods.map((method) => (
            <Card key={method.name} className="border-t-4 border-t-chocomemo">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{method.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-[3rem_1fr] gap-x-3 gap-y-2 text-sm">
                  {method.rows.map(([label, value]) => (
                    <div key={label} className="contents">
                      <dt className="text-neutral-500">{label}</dt>
                      <dd className="text-neutral-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-[15px] leading-relaxed text-neutral-700">
          Google ドライブでは、ドライブの中の、このアプリ専用の見えない場所に保存します。ほかのファイルは読みません。
        </p>
      </Section>

      <Section title="データの扱い">
        <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-neutral-700">
          {dataPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <Link
          href={`/apps/${app.slug}/privacy`}
          className="inline-flex items-center gap-1 text-[15px] font-medium text-chocomemo-ink underline-offset-4 hover:underline"
        >
          プライバシーポリシーを読む
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Section>

      <Section title="入手方法">
        {app.storeUrl ? (
          <a
            href={app.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-chocomemo-ink px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Chrome ウェブストアで入手する
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <p className="text-[15px] leading-relaxed text-neutral-700">
            Chrome ウェブストアで公開の準備をしています。
          </p>
        )}
        <p className="text-[15px] leading-relaxed text-neutral-700">
          ソースコードは GitHub で公開しています。
          <br />
          <a
            href={app.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 break-all ${linkClass}`}
          >
            {app.repositoryUrl.replace(/^https?:\/\//, "")}
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          </a>
        </p>
      </Section>

      <Section title="お問い合わせ">
        <p className="text-[15px] leading-relaxed text-neutral-700">
          <EmailLink {...appsContactEmail} className={linkClass} />
        </p>
      </Section>

      <Section title="作者とライセンス">
        <p className="text-[15px] leading-relaxed text-neutral-700">
          作者は {app.author} です。
          <a href={app.license.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {app.license.name} ライセンス
          </a>
          で公開しています。
        </p>
      </Section>
    </article>
  );
}
