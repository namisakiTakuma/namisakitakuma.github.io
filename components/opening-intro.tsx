"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { profileIcon } from "@/data/profile";
import { cn } from "@/lib/utils";

// トップから入ったときに一度だけ流す幕。表紙のように「いつも考えています。」を筆で書くように出し、
// アイコンと名前を添えてから、幕が上がってサイトになる。
// 動きは CSS（app/globals.css の .opening-intro）なので、JavaScript の読み込みを待たずに始まる。
// 同じタブでの2回目以降と、動きを減らす設定のときは出さない（app/layout.tsx のスクリプトと CSS で、描く前に消す）。

export function OpeningIntro({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // クリックやキー操作で、待たずに幕を上げる
  const [skipping, setSkipping] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const hidden =
      document.documentElement.dataset.intro === "seen" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 読み込みが遅く、JavaScript が動く前に幕が上がりきっていたときも、ここで片づける
    const finished =
      el !== null &&
      el.getAnimations().length > 0 &&
      el.getAnimations().every((a) => a.playState === "finished");
    if (hidden || finished) {
      onDone();
      return;
    }

    // 幕が上がるまでは、下のページをスクロールさせない
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const skip = () => setSkipping(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
    };
  }, [onDone]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("opening-intro", skipping && "is-skipping")}
      onClick={() => setSkipping(true)}
      onAnimationEnd={(e) => {
        // 中の文字の動きではなく、幕が上がりきったときだけ
        if (e.target === e.currentTarget) onDone();
      }}
    >
      <p className="opening-intro__copy">いつも考えています。</p>
      <div className="opening-intro__name">
        <Image
          src={profileIcon}
          alt=""
          width={40}
          height={40}
          loading="eager"
          className="h-10 w-10 rounded-full border border-neutral-200 bg-white"
        />
        並崎 功真
      </div>
    </div>
  );
}
