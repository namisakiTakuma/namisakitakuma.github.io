"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// トップから入ったときに一度だけ流す幕。何も見えないところに、ハムスターが左から転がってきて座り、
// 下から猫が一気に出てくる。絵が止まったら、幕が上がってサイトになる。
// 絵（public/images/cat/opening.svg）は SVG の中の SMIL で動き、読み込んだときから動き始める。
// 幕が上がる時刻は、絵を読み込んでから数える（app/layout.tsx のスクリプトと app/globals.css の .opening-intro）。
// 同じタブでの2回目以降、裏のタブで開かれたとき、動きを減らす設定のときは出さない（描く前に消す）。

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
        // 幕が上がりきったときだけ
        if (e.target === e.currentTarget) onDone();
      }}
    >
      {/* 動く SVG は next/image を通さず、そのまま置く（大きさは CSS で決める） */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cat/opening.svg"
        alt=""
        width={5100}
        height={1270}
        fetchPriority="high"
        className="opening-intro__art"
      />
    </div>
  );
}
