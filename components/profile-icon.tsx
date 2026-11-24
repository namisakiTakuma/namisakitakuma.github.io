"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { profileIcon, profileIconLoop } from "@/data/profile";
import { cn } from "@/lib/utils";

// サイドバーのアイコン。開いたときに1周だけ動き、あとは動く版の最初のコマで止まっている。押す（タップする）と、また1周する。
// 最初と最後のコマは同じ絵なので、止めても流しても絵は跳ばない。
// 動く版は SVG の中の SMIL と CSS で動いている。<img> では止めたり頭から流し直したりできないので、
// <object> で読み込んで、中の文書を操作する。
// 静止画は動く版の最初のコマと同じ絵。下に敷いておき、動く版を読み込む前と、動きを減らす設定のときに見せる

const LOOP_MS = 9000; // 動く版の1周
const FIRST_DELAY_MS = 600; // 読み込んで（トップの幕が上がって）から、最初に動くまで

export function ProfileIcon({
  alt,
  hold = false,
  className,
}: {
  alt: string;
  // トップの幕が出ている間は true。上がるまで最初の1周を待つ
  hold?: boolean;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const objectRef = useRef<HTMLObjectElement>(null);
  const holdRef = useRef(hold);
  const startRef = useRef<() => void>(() => {});

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const object = objectRef.current;
    if (!wrapper || !object) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let svg: SVGSVGElement | null = null;
    let started = false;
    let playing = false;
    let timer: number | undefined;

    const animations = () => svg?.ownerDocument.getAnimations() ?? [];
    // 最初のコマで止める
    const rewind = () => {
      if (!svg) return;
      svg.pauseAnimations();
      svg.setCurrentTime(0);
      animations().forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });
    };
    const play = () => {
      if (!svg || playing) return;
      started = true;
      playing = true;
      window.clearTimeout(timer);
      rewind();
      svg.unpauseAnimations();
      animations().forEach((a) => a.play());
      timer = window.setTimeout(() => {
        rewind();
        playing = false;
      }, LOOP_MS);
    };
    const start = () => {
      if (!svg || started || holdRef.current) return;
      started = true;
      timer = window.setTimeout(play, FIRST_DELAY_MS);
    };
    startRef.current = start;

    // 中の文書は別のウィンドウのものなので、instanceof ではなく名前で SVG か確かめる
    const attach = () => {
      const root = object.contentDocument?.documentElement;
      if (!root || root.nodeName !== "svg") return;
      svg = root as unknown as SVGSVGElement;
      // SVG に書いてある大きさ（1460）ではなく、枠いっぱいに合わせる
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      rewind();
      start();
    };
    // 読み込みが速く、ここに来る前に読み終わっていることもある
    attach();
    object.addEventListener("load", attach);

    wrapper.addEventListener("click", play);

    return () => {
      window.clearTimeout(timer);
      object.removeEventListener("load", attach);
      wrapper.removeEventListener("click", play);
    };
  }, []);

  useEffect(() => {
    holdRef.current = hold;
    if (!hold) startRef.current();
  }, [hold]);

  return (
    <span
      ref={wrapperRef}
      // トップの幕の絵が、最後にここへ縮んで入る（components/opening-intro.tsx）
      data-profile-icon=""
      role="img"
      aria-label={alt}
      className={cn(
        "relative block cursor-pointer overflow-hidden rounded-full border border-neutral-200 bg-[#FDF9ED] motion-reduce:cursor-auto",
        className,
      )}
    >
      <Image
        src={profileIcon}
        alt=""
        width={96}
        height={96}
        loading="eager"
        className="absolute inset-0 h-full w-full"
      />
      <object
        ref={objectRef}
        data={profileIconLoop}
        type="image/svg+xml"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none relative block h-full w-full motion-reduce:hidden"
      />
    </span>
  );
}
