"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// トップから入ったときに一度だけ流す幕。何も見えないところに、ハムスターが左から転がってきて座り、
// 下から猫が一気に出てくる。絵が止まったら、猫とハムスターがサイドバーのアイコンへ縮んで入り、サイトになる。
// 絵（public/images/cat/opening.svg）は SVG の中の SMIL で動き、読み込んだときから動き始める。
// 幕が終わる時刻は、絵を読み込んでから数える（app/layout.tsx のスクリプトと app/globals.css の .opening-intro）。
// CSS だけでは幕が上に上がって終わる。JavaScript が動いていれば、上がり始めた瞬間に止めて、アイコンへ縮める動きに替える。
// 同じタブでの2回目以降、裏のタブで開かれたとき、動きを減らす設定のときは出さない（描く前に消す）。

// 猫の両目の中点と間隔。幕の最後の絵は絵の幅・高さに対する割合、アイコンはアイコンの幅に対する割合（どちらも画面で測った値）。
// この2つが重なるように縮めると、最後の絵とアイコンの猫がちょうど重なる
const ART_EYES = { x: 0.5026, y: 0.8246, gap: 0.1214 };
const ICON_EYES = { x: 0.5086, y: 0.666, gap: 0.4251 };
const SHRINK_MS = 900;
const SWAP_MS = 200;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

// 幕の絵を、サイドバーのアイコンの丸へ縮めて重ね、最後にアイコンと入れ替える
async function shrinkIntoIcon(
  curtain: HTMLElement,
  art: HTMLElement,
  icon: HTMLElement,
) {
  // 絵は CSS で translateX(-50%) されている。動かす前の位置（変形の前の左上）を求める
  const a = art.getBoundingClientRect();
  const w = a.width;
  const h = a.height;
  const left = a.left + w / 2;
  const top = a.top;
  // アイコンの丸（枠線の内側）
  const r = icon.getBoundingClientRect();
  const size = icon.clientWidth;
  const iconLeft = r.left + icon.clientLeft;
  const iconTop = r.top + icon.clientTop;

  const scale = (ICON_EYES.gap * size) / (ART_EYES.gap * w);
  // 絵の中の目の中点（絵の左上から）と、画面の上で重ねたい場所
  const px = ART_EYES.x * w;
  const py = ART_EYES.y * h;
  const qx = iconLeft + ICON_EYES.x * size;
  const qy = iconTop + ICON_EYES.y * size;
  // アイコンの丸を、絵の中の座標に直したもの。縮めながら、絵をこの丸で切り抜いていく
  const cx = px + (iconLeft + size / 2 - qx) / scale;
  const cy = py + (iconTop + size / 2 - qy) / scale;
  const radius = size / 2 / scale;

  // 動いている間は本物のアイコンを隠し、二重に見えないようにする
  icon.style.opacity = "0";
  art.style.transformOrigin = "0 0";
  const move = art.animate(
    [
      {
        transform: `translate(${-w / 2}px, 0px) scale(1)`,
        clipPath: `circle(${Math.hypot(w, h)}px at ${cx}px ${cy}px)`,
      },
      {
        transform: `translate(${qx - left - scale * px}px, ${qy - top - scale * py}px) scale(${scale})`,
        clipPath: `circle(${radius}px at ${cx}px ${cy}px)`,
      },
    ],
    { duration: SHRINK_MS, easing: EASE, fill: "forwards" },
  );
  // 幕の地の色を消して、後ろのサイトを見せていく
  curtain.animate(
    [{ backgroundColor: "#fcfbf7" }, { backgroundColor: "rgb(252 251 247 / 0)" }],
    { duration: 600, delay: 250, easing: "ease-out", fill: "forwards" },
  );
  await move.finished;
  // 重なったところで、本物のアイコンと入れ替える
  icon.animate([{ opacity: 0 }, { opacity: 1 }], { duration: SWAP_MS });
  icon.style.opacity = "";
  await curtain.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: SWAP_MS,
    fill: "forwards",
  }).finished;
}

// アイコンが画面の中に見えているか（# 付きの URL で途中から開いたときなどは見えていない）
function isOnScreen(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return (
    r.width > 0 &&
    r.top >= 0 &&
    r.left >= 0 &&
    r.bottom <= window.innerHeight &&
    r.right <= window.innerWidth
  );
}

export function OpeningIntro({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLImageElement>(null);
  // クリックやキー操作で、待たずに幕を上げる
  const [skipping, setSkipping] = useState(false);
  // アイコンへ縮めている間（CSS の幕の動きを止め、クリックでも飛ばさない）
  const [shrinking, setShrinking] = useState(false);
  const shrinkingRef = useRef(false);

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

    // 幕が終わるまでは、下のページをスクロールさせない
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const skip = () => {
      if (!shrinkingRef.current) setSkipping(true);
    };
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
      className={cn(
        "opening-intro",
        skipping && "is-skipping",
        shrinking && "is-shrinking",
      )}
      onClick={() => {
        if (!shrinkingRef.current) setSkipping(true);
      }}
      onAnimationStart={(e) => {
        // 絵を読み込んで動き終わり、幕が上がり始めた瞬間だけ、アイコンへ縮める動きに替える。
        // 飛ばしたとき、絵を読み込めなかったとき、アイコンが見えないときは、そのまま上げる
        if (
          e.target !== e.currentTarget ||
          e.animationName !== "intro-lift-after-art"
        )
          return;
        const curtain = e.currentTarget;
        const art = artRef.current;
        const icon = document.querySelector<HTMLElement>("[data-profile-icon]");
        if (!art || !icon || !isOnScreen(icon)) return;
        shrinkingRef.current = true;
        curtain.getAnimations().forEach((a) => {
          if (a instanceof CSSAnimation) a.cancel();
        });
        setShrinking(true);
        shrinkIntoIcon(curtain, art, icon).then(onDone, onDone);
      }}
      onAnimationEnd={(e) => {
        // 幕が上がりきったときだけ
        if (e.target === e.currentTarget) onDone();
      }}
    >
      {/* 動く SVG は next/image を通さず、そのまま置く（大きさは CSS で決める） */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={artRef}
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
