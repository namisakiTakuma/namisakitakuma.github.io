import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// トップの幕は、同じタブでは最初の1回だけ出す。幕が描かれる前に印をつけ、2回目以降は CSS で消す。
// 裏のタブで開かれたときも出さない（絵が見えないうちに動き終わってしまうため。次にそのタブで開き直せば出る）。
// 幕の絵（.opening-intro__art）を読み込めたら html に data-intro-art をつけ、幕が上がる時刻をそこから数える。
// 英語のページ（/en/〜）では、html の lang を描く前に en にする（書き出した html は ja のまま。lib/locale.tsx も見る）
const introScript = `try{var r=document.documentElement,p=location.pathname;if(p==="/en"||p.indexOf("/en/")===0)r.lang="en";if(sessionStorage.getItem("intro-seen")||document.hidden)r.dataset.intro="seen";else{sessionStorage.setItem("intro-seen","1");var f=function(e){var t=e.target;if(t&&t.classList&&t.classList.contains("opening-intro__art")){r.dataset.introArt=e.type==="load"?"ready":"failed";document.removeEventListener("load",f,true);document.removeEventListener("error",f,true)}};document.addEventListener("load",f,true);document.addEventListener("error",f,true)}}catch(e){}`;

export const metadata: Metadata = {
  // 日本語と英語のページを互いに知らせる URL（lib/page-metadata.ts）の頭につく
  metadataBase: new URL("https://namisakitakuma.github.io"),
  // 詳細ページでは「プロジェクト名 | Takuma | Portfolio」になる
  title: { default: "Takuma | Portfolio", template: "%s | Takuma | Portfolio" },
  description: "Portfolio of Takuma Namisaki, Graduate Student at Osaka Metropolitan University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // introScript が data-intro と lang をつけるので、html の属性の食い違いは警告しない。
    // 中身（左の欄・本文・メニュー）は、言語ごとのレイアウト（app/(ja)/layout.tsx と app/en/layout.tsx）が置く
    <html
      lang="ja"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased selection:bg-blue-500/30 selection:text-blue-200`}
      >
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
