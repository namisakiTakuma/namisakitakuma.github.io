"use client";

import { useSyncExternalStore } from "react";

// メールアドレスを、押すとメールが開くリンクで見せる。
// bot に拾われないよう、書き出す HTML には @ を含めず、ブラウザで開いたときに組み立てる。
// 組み立てる前と JavaScript が動かないときは、サイドバー（components/email-contact.tsx）と同じく @ の代わりに肉球で見せる

const subscribe = () => () => {};

export function EmailLink({
  user,
  domain,
  className,
}: {
  user: string;
  domain: string;
  className?: string;
}) {
  const inBrowser = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  if (!inBrowser) {
    return (
      <span className={className}>
        {user} 🐾 {domain}
      </span>
    );
  }
  const address = `${user}@${domain}`;
  return (
    <a href={`mailto:${address}`} className={className}>
      {address}
    </a>
  );
}
